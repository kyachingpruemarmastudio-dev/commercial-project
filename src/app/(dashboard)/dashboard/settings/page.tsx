"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";

export default function SettingsPage() {
  const { data: session } = useSession();

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground">Manage your account preferences</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Profile</CardTitle>
          <CardDescription>Update your personal information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-1.5 block">Name</label>
            <Input defaultValue={session?.user?.name || ""} />
          </div>
          <div>
            <label className="text-sm font-medium mb-1.5 block">Email</label>
            <Input defaultValue={session?.user?.email || ""} disabled />
          </div>
          <Button
            variant="brand"
            onClick={() => toast.success("Profile updated (demo)")}
          >
            Save Changes
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Password</CardTitle>
          <CardDescription>Change your password</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-1.5 block">Current Password</label>
            <Input type="password" />
          </div>
          <div>
            <label className="text-sm font-medium mb-1.5 block">New Password</label>
            <Input type="password" />
          </div>
          <Button
            variant="brand"
            onClick={() => toast.success("Password updated (demo)")}
          >
            Update Password
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
