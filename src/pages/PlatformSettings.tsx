import { useState } from 'react';
import { Copy, Check, Zap, Lock, Mail, Settings as SettingsIcon, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface PlatformConfig {
  general: {
    platformName: string;
    brandingColor: string;
    logoUrl: string;
    supportEmail: string;
  };
  security: {
    twoFactorRequired: boolean;
    passwordMinLength: number;
    passwordRequireSpecial: boolean;
    passwordRequireNumbers: boolean;
    sessionTimeout: number;
    ipWhitelistEnabled: boolean;
    allowedIPs: string[];
  };
  email: {
    smtpServer: string;
    smtpPort: number;
    smtpUsername: string;
    smtpPassword: string;
    fromEmail: string;
    fromName: string;
  };
}

export default function PlatformSettings() {
  const [copied, setCopied] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [config, setConfig] = useState<PlatformConfig>({
    general: {
      platformName: 'WorkFlow AI',
      brandingColor: '#3B82F6',
      logoUrl: 'https://api.example.com/logo.png',
      supportEmail: 'support@workflowai.com',
    },
    security: {
      twoFactorRequired: true,
      passwordMinLength: 8,
      passwordRequireSpecial: true,
      passwordRequireNumbers: true,
      sessionTimeout: 30,
      ipWhitelistEnabled: false,
      allowedIPs: ['192.168.1.1', '10.0.0.1'],
    },
    email: {
      smtpServer: 'smtp.sendgrid.net',
      smtpPort: 587,
      smtpUsername: 'apikey',
      smtpPassword: 'SG.xxxxxxxxxxxxxxxxxxxx',
      fromEmail: 'noreply@workflowai.com',
      fromName: 'WorkFlow AI',
    },
  });

  const handleCopyApiKey = () => {
    navigator.clipboard.writeText(config.email.smtpPassword);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleGeneralChange = (field: keyof typeof config.general, value: string) => {
    setConfig(prev => ({
      ...prev,
      general: { ...prev.general, [field]: value }
    }));
  };

  const handleSecurityChange = (field: string, value: string | boolean) => {
    setConfig(prev => ({
      ...prev,
      security: { ...prev.security, [field]: value }
    }));
  };

  const handleEmailChange = (field: string, value: string | boolean) => {
    setConfig(prev => ({
      ...prev,
      email: { ...prev.email, [field]: value }
    }));
  };

  const handleAddIP = (ip: string) => {
    if (ip && !config.security.allowedIPs.includes(ip)) {
      setConfig(prev => ({
        ...prev,
        security: {
          ...prev.security,
          allowedIPs: [...prev.security.allowedIPs, ip]
        }
      }));
    }
  };

  const handleRemoveIP = (ip: string) => {
    setConfig(prev => ({
      ...prev,
      security: {
        ...prev.security,
        allowedIPs: prev.security.allowedIPs.filter(existingIp => existingIp !== ip)
      }
    }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
          System Settings
        </h1>
        <p className="text-muted-foreground mt-2">Configure platform-wide settings and policies</p>
      </div>

      {/* Tab-based Settings */}
      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-3 border-b border-border/50 h-auto p-0 bg-transparent rounded-none">
          <TabsTrigger value="general" className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent">
            <Zap className="w-4 h-4 mr-2" />
            General
          </TabsTrigger>
          <TabsTrigger value="security" className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent">
            <Lock className="w-4 h-4 mr-2" />
            Security
          </TabsTrigger>
          <TabsTrigger value="email" className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent">
            <Mail className="w-4 h-4 mr-2" />
            Email
          </TabsTrigger>
        </TabsList>

        {/* General Settings Tab */}
        <TabsContent value="general" className="space-y-6 mt-6">
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-yellow-600" />
                General Configuration
              </CardTitle>
              <CardDescription>Manage basic platform settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Platform Name */}
              <div className="space-y-2">
                <Label htmlFor="platformName" className="font-semibold">Platform Name</Label>
                <Input
                  id="platformName"
                  value={config.general.platformName}
                  onChange={(e) => handleGeneralChange('platformName', e.target.value)}
                  placeholder="Enter platform name"
                  className="border-border/50"
                />
                <p className="text-xs text-muted-foreground">This appears in emails and user interfaces</p>
              </div>

              {/* Support Email */}
              <div className="space-y-2">
                <Label htmlFor="supportEmail" className="font-semibold">Support Email</Label>
                <Input
                  id="supportEmail"
                  type="email"
                  value={config.general.supportEmail}
                  onChange={(e) => handleGeneralChange('supportEmail', e.target.value)}
                  placeholder="support@example.com"
                  className="border-border/50"
                />
                <p className="text-xs text-muted-foreground">Contact email for user support requests</p>
              </div>

              {/* Branding Color */}
              <div className="space-y-2">
                <Label htmlFor="brandingColor" className="font-semibold">Brand Color</Label>
                <div className="flex gap-2 items-end">
                  <div className="flex-1 flex items-center gap-2 p-3 border border-border/50 rounded-lg bg-muted/30">
                    <div
                      className="w-12 h-12 rounded-lg border-2 border-border/50 cursor-pointer"
                      style={{ backgroundColor: config.general.brandingColor }}
                    />
                    <Input
                      id="brandingColor"
                      type="text"
                      value={config.general.brandingColor}
                      onChange={(e) => handleGeneralChange('brandingColor', e.target.value)}
                      placeholder="#3B82F6"
                      className="flex-1 border-0 bg-transparent"
                    />
                  </div>
                  <input
                    type="color"
                    value={config.general.brandingColor}
                    onChange={(e) => handleGeneralChange('brandingColor', e.target.value)}
                    className="h-10 w-14 rounded cursor-pointer"
                  />
                </div>
              </div>

              {/* Logo URL */}
              <div className="space-y-2">
                <Label htmlFor="logoUrl" className="font-semibold">Logo URL</Label>
                <Input
                  id="logoUrl"
                  value={config.general.logoUrl}
                  onChange={(e) => handleGeneralChange('logoUrl', e.target.value)}
                  placeholder="https://api.example.com/logo.png"
                  className="border-border/50"
                />
                <p className="text-xs text-muted-foreground">Logo displayed in platform UI</p>
              </div>

              <div className="pt-4 border-t border-border/30">
                <Button className="gap-2 bg-blue-600 hover:bg-blue-700">
                  <Check className="w-4 h-4" />
                  Save General Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Settings Tab */}
        <TabsContent value="security" className="space-y-6 mt-6">
          {/* 2FA and Password Policy */}
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="w-5 h-5 text-red-600" />
                Password & Authentication
              </CardTitle>
              <CardDescription>Configure authentication requirements</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* 2FA Enforcement */}
              <div className="flex items-center justify-between p-3 bg-muted/40 rounded-lg border border-border/50">
                <div className="space-y-1">
                  <Label className="font-semibold">Enforce Two-Factor Authentication</Label>
                  <p className="text-xs text-muted-foreground">Require 2FA for all users</p>
                </div>
                <Switch
                  checked={config.security.twoFactorRequired}
                  onCheckedChange={(checked) => handleSecurityChange('twoFactorRequired', checked)}
                />
              </div>

              {/* Password Minimum Length */}
              <div className="space-y-2">
                <Label htmlFor="passwordMinLength" className="font-semibold">Minimum Password Length</Label>
                <div className="flex items-center gap-3">
                  <Select
                    value={config.security.passwordMinLength.toString()}
                    onValueChange={(value) => handleSecurityChange('passwordMinLength', parseInt(value))}
                  >
                    <SelectTrigger className="w-32 border-border/50">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="6">6 characters</SelectItem>
                      <SelectItem value="8">8 characters</SelectItem>
                      <SelectItem value="10">10 characters</SelectItem>
                      <SelectItem value="12">12 characters</SelectItem>
                    </SelectContent>
                  </Select>
                  <Badge variant="outline">Current: {config.security.passwordMinLength}</Badge>
                </div>
              </div>

              {/* Password Requirements */}
              <div className="space-y-3 p-3 bg-blue-50/30 dark:bg-blue-950/30 rounded-lg border border-blue-200/50 dark:border-blue-800/50">
                <p className="text-sm font-semibold text-foreground">Password Requirements</p>

                <div className="flex items-center justify-between">
                  <Label className="font-medium">Require Special Characters</Label>
                  <Switch
                    checked={config.security.passwordRequireSpecial}
                    onCheckedChange={(checked) => handleSecurityChange('passwordRequireSpecial', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label className="font-medium">Require Numbers</Label>
                  <Switch
                    checked={config.security.passwordRequireNumbers}
                    onCheckedChange={(checked) => handleSecurityChange('passwordRequireNumbers', checked)}
                  />
                </div>
              </div>

              {/* Session Timeout */}
              <div className="space-y-2">
                <Label htmlFor="sessionTimeout" className="font-semibold">Session Timeout (minutes)</Label>
                <Input
                  id="sessionTimeout"
                  type="number"
                  value={config.security.sessionTimeout}
                  onChange={(e) => handleSecurityChange('sessionTimeout', parseInt(e.target.value))}
                  min="5"
                  max="480"
                  className="border-border/50"
                />
                <p className="text-xs text-muted-foreground">Auto-logout inactive users after this duration</p>
              </div>

              <div className="pt-4 border-t border-border/30">
                <Button className="gap-2 bg-red-600 hover:bg-red-700">
                  <Check className="w-4 h-4" />
                  Save Security Settings
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* IP Whitelist */}
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="w-5 h-5 text-orange-600" />
                IP Whitelist
              </CardTitle>
              <CardDescription>Restrict platform access by IP addresses</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Enable IP Whitelist */}
              <div className="flex items-center justify-between p-3 bg-muted/40 rounded-lg border border-border/50">
                <div className="space-y-1">
                  <Label className="font-semibold">Enable IP Whitelist</Label>
                  <p className="text-xs text-muted-foreground">Only allows access from specified IPs</p>
                </div>
                <Switch
                  checked={config.security.ipWhitelistEnabled}
                  onCheckedChange={(checked) => handleSecurityChange('ipWhitelistEnabled', checked)}
                />
              </div>

              {config.security.ipWhitelistEnabled && (
                <div className="space-y-3 p-3 bg-orange-50/30 dark:bg-orange-950/30 rounded-lg border border-orange-200/50 dark:border-orange-800/50">
                  {/* Add New IP */}
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold">Add IP Address</Label>
                    <div className="flex gap-2">
                      <Input
                        placeholder="192.168.1.100"
                        className="border-orange-200/50 dark:border-orange-800/50"
                        id="newIp"
                      />
                      <Button
                        onClick={() => {
                          const input = document.getElementById('newIp') as HTMLInputElement;
                          if (input) {
                            handleAddIP(input.value);
                            input.value = '';
                          }
                        }}
                        variant="outline"
                        size="sm"
                        className="whitespace-nowrap"
                      >
                        Add IP
                      </Button>
                    </div>
                  </div>

                  {/* Whitelisted IPs */}
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold">Whitelisted IPs ({config.security.allowedIPs.length})</Label>
                    <div className="space-y-2">
                      {config.security.allowedIPs.map((ip) => (
                        <div
                          key={ip}
                          className="flex items-center justify-between p-2 bg-white dark:bg-slate-900 rounded border border-border/50"
                        >
                          <code className="text-sm font-mono text-muted-foreground">{ip}</code>
                          <Button
                            onClick={() => handleRemoveIP(ip)}
                            variant="ghost"
                            size="sm"
                            className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/30"
                          >
                            Remove
                          </Button>
                        </div>
                      ))}
                      {config.security.allowedIPs.length === 0 && (
                        <p className="text-sm text-muted-foreground italic">No IPs whitelist yet</p>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Email & Notifications Tab */}
        <TabsContent value="email" className="space-y-6 mt-6">
          {/* SMTP Configuration */}
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-green-600" />
                SMTP Configuration
              </CardTitle>
              <CardDescription>Configure email sending settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* SMTP Server */}
              <div className="space-y-2">
                <Label htmlFor="smtpServer" className="font-semibold">SMTP Server</Label>
                <Input
                  id="smtpServer"
                  value={config.email.smtpServer}
                  onChange={(e) => handleEmailChange('smtpServer', e.target.value)}
                  placeholder="smtp.sendgrid.net"
                  className="border-border/50"
                />
              </div>

              {/* SMTP Port */}
              <div className="space-y-2">
                <Label htmlFor="smtpPort" className="font-semibold">SMTP Port</Label>
                <Select
                  value={config.email.smtpPort.toString()}
                  onValueChange={(value) => handleEmailChange('smtpPort', parseInt(value))}
                >
                  <SelectTrigger className="border-border/50">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="25">25 (Standard)</SelectItem>
                    <SelectItem value="465">465 (SSL)</SelectItem>
                    <SelectItem value="587">587 (TLS)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* SMTP Username */}
              <div className="space-y-2">
                <Label htmlFor="smtpUsername" className="font-semibold">SMTP Username</Label>
                <Input
                  id="smtpUsername"
                  value={config.email.smtpUsername}
                  onChange={(e) => handleEmailChange('smtpUsername', e.target.value)}
                  placeholder="apikey"
                  className="border-border/50"
                />
              </div>

              {/* SMTP Password */}
              <div className="space-y-2">
                <Label htmlFor="smtpPassword" className="font-semibold">SMTP Password / API Key</Label>
                <div className="flex gap-2">
                  <div className="flex-1 relative">
                    <Input
                      id="smtpPassword"
                      type={showPassword ? 'text' : 'password'}
                      value={config.email.smtpPassword}
                      onChange={(e) => handleEmailChange('smtpPassword', e.target.value)}
                      placeholder="SG.xxxxxxxxxxxxxxxxxxxx"
                      className="border-border/50 pr-10"
                    />
                    <button
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  <Button
                    onClick={handleCopyApiKey}
                    variant="outline"
                    size="sm"
                    className="gap-2"
                  >
                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    {copied ? 'Copied' : 'Copy'}
                  </Button>
                </div>
              </div>

              {/* From Email */}
              <div className="space-y-2">
                <Label htmlFor="fromEmail" className="font-semibold">From Email</Label>
                <Input
                  id="fromEmail"
                  type="email"
                  value={config.email.fromEmail}
                  onChange={(e) => handleEmailChange('fromEmail', e.target.value)}
                  placeholder="noreply@workflowai.com"
                  className="border-border/50"
                />
              </div>

              {/* From Name */}
              <div className="space-y-2">
                <Label htmlFor="fromName" className="font-semibold">From Name</Label>
                <Input
                  id="fromName"
                  value={config.email.fromName}
                  onChange={(e) => handleEmailChange('fromName', e.target.value)}
                  placeholder="WorkFlow AI"
                  className="border-border/50"
                />
              </div>

              {/* Test Email */}
              <div className="pt-4 border-t border-border/30 flex gap-2">
                <Button className="gap-2 bg-green-600 hover:bg-green-700">
                  <Check className="w-4 h-4" />
                  Save Email Settings
                </Button>
                <Button variant="outline" className="gap-2">
                  <Mail className="w-4 h-4" />
                  Send Test Email
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Email Templates Info */}
          <Card className="bg-blue-50/30 dark:bg-blue-950/30 border-blue-200/50 dark:border-blue-800/50">
            <CardHeader>
              <CardTitle className="text-sm">Email Templates</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-sm text-muted-foreground">
                Default email templates are used for user notifications, password resets, and account management. To customize templates, contact support or use the API.
              </p>
              <div className="flex gap-2 text-xs text-muted-foreground">
                <Badge variant="outline">Welcome Email</Badge>
                <Badge variant="outline">Password Reset</Badge>
                <Badge variant="outline">Account Activity</Badge>
                <Badge variant="outline">Security Alerts</Badge>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
