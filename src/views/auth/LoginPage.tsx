import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useLoginForm } from "@/hooks/useLoginForm"; // Import the custom hook

export default function LoginPage() {
  const {
    formData,
    errors,
    isLoading,
    handleInputChange,
    handleSubmit,
    showPassword,
    setShowPassword,
  } = useLoginForm();

  return (
    <div className="flex items-center justify-center min-h-screen p-4 sm:p-6 md:p-8 relative overflow-hidden">
      {/* Mindful Meadow Background with Natural Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-sage/30 to-background/95"></div>
      
      {/* Organic Background Shapes for Visual Interest */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-sage/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-sunflower/8 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-sky/5 rounded-full blur-2xl"></div>
      </div>

      {/* Login Card */}
      <Card className="w-full max-w-md relative z-10 backdrop-blur-sm bg-card/95 border-border/50 shadow-xl">
        <CardHeader className="text-center space-y-3 pt-8 pb-6">
          <div className="w-16 h-16 mx-auto bg-gradient-to-br from-terracotta to-sunflower rounded-2xl flex items-center justify-center mb-2">
            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
          </div>
          <CardTitle className="text-2xl font-sans sm:text-3xl text-foreground">
            Welcome Back
          </CardTitle>
          <CardDescription className="text-muted-foreground font-sans text-sm sm:text-base leading-relaxed">
          Transform your "I'll read this later" syndrome into mindful learning, one drop at a time.
          </CardDescription>
        </CardHeader>
        
        <div className="mx-6 h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>
        
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6 px-6 pt-6 pb-8">
            {/* General Error Message */}
            {errors.general && (
              <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm font-sans">
                {errors.general}
              </div>
            )}

            {/* Email Field */}
            <div className="space-y-3">
              <Label htmlFor="email" className="text-sm font-sans text-foreground font-medium">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange("email")}
                placeholder="your.email@example.com"
                className={cn(
                  "font-sans bg-background/50 border-border/60 focus-visible:border-terracotta",
                  errors.email && "border-destructive focus-visible:border-destructive"
                )}
                disabled={isLoading}
              />
              {errors.email && (
                <p className="text-destructive text-xs font-sans">{errors.email}</p>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-3">
              <Label htmlFor="password" className="text-sm font-sans text-foreground font-medium">
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleInputChange("password")}
                  placeholder="Enter your password"
                  className={cn(
                    "font-sans bg-background/50 border-border/60 focus-visible:border-terracotta pr-10",
                    errors.password && "border-destructive focus-visible:border-destructive"
                  )}
                  disabled={isLoading}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLoading}
                >
                  {showPassword ? (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-destructive text-xs font-sans">{errors.password}</p>
              )}
            </div>
          </CardContent>
          
          <CardFooter className="flex flex-col space-y-4 px-6 pb-8 pt-2">
            <Button 
              type="submit"
              variant="terracotta"
              className="w-full font-sans text-base font-medium shadow-lg hover:shadow-xl transition-all duration-200"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing In...
                </div>
              ) : (
                "Sign In"
              )}
            </Button>
            
            <div className="flex items-center justify-between w-full text-sm font-sans">
              <Link 
                to="/forgot-password" 
                className="text-sky hover:text-sky/80 hover:underline transition-colors duration-200"
              >
                Forgot password?
              </Link>
              <Link 
                to="/signup" 
                className="text-terracotta hover:text-terracotta/80 hover:underline transition-colors duration-200"
              >
                Create account
              </Link>
            </div>
            
            <div className="text-xs text-center text-muted-foreground font-sans pt-4 leading-relaxed">
              By signing in, you agree to nurture your digital wellness journey
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}