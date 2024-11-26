"use client";

import { Mail, ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function Page() {
  return (
    <div className="min-h-[75vh] flex items-center justify-center p-4 ">
      <Card className="w-full max-w-md">
        <CardContent className="pt-6 px-6">
          <div className="text-center space-y-6 ">
            {/* Icon */}
            <div className="mx-auto w-16 h-16 rounded-full flex items-center justify-center">
              <Mail className="w-8 h-8 " />
            </div>

            {/* Title and Description */}
            <div className="space-y-2">
              <h2 className="text-2xl font-bold tracking-tight ">
                Verify your email
              </h2>
              <p className=" text-sm text-secondary-foreground">
                We've sent you a verification link. Please check your inbox to
                continue.
              </p>
            </div>

            {/* Steps */}
            <div className="space-y-4 py-4">
              <div className="flex items-center space-x-3 text-left">
                <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center">
                  <span className=" font-semibold">1</span>
                </div>
                <p className="text-sm text-secondary-foreground">
                  Open your email inbox
                </p>
              </div>

              <div className="flex items-center space-x-3 text-left">
                <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center">
                  <span className=" font-semibold">2</span>
                </div>
                <p className="text-sm text-secondary-foreground">
                  Click the verification link we sent you
                </p>
              </div>

              <div className="flex items-center space-x-3 text-left">
                <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center">
                  <span className="font-semibold">3</span>
                </div>
                <p className="text-sm text-secondary-foreground">
                  Return here to continue
                </p>
              </div>
            </div>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t "></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2  ">Already verified?</span>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3">
              <Button
                className="w-full group"
                onClick={() => {
                  window.location.href =
                    "/api/auth/logout?returnTo=api/auth/login";
                }}
              >
                Continue to Login
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>

              <Button
                variant="outline"
                className="w-full"
                onClick={() => (window.location.href = "/")}
              >
                Return to Home
              </Button>
            </div>

            {/* Help text */}
            <p className="text-xs text-gray-500">
              Didn't receive the email? Check your spam folder or try logging in
              again to resend the verification email.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
