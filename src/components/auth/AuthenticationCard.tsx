import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Eye,
  EyeOff,
  User,
  Mail,
  Lock,
  School,
  Users,
  UserCog,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { UserRole } from "@/lib/auth";

interface AuthenticationCardProps {
  onForgotPassword?: (email: string) => void;
}

const AuthenticationCard = ({
  onForgotPassword = () => {},
}: AuthenticationCardProps) => {
  const { login, isLoading, error } = useAuth();
  const [activeTab, setActiveTab] = useState<UserRole>("student");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [forgotPasswordMode, setForgotPasswordMode] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (forgotPasswordMode) {
      onForgotPassword(email);
    } else {
      await login(email, password, activeTab);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const getUserIcon = () => {
    switch (activeTab) {
      case "student":
        return <School className="h-5 w-5" />;
      case "teacher":
        return <Users className="h-5 w-5" />;
      case "parent":
        return <User className="h-5 w-5" />;
      case "admin":
        return <UserCog className="h-5 w-5" />;
      default:
        return <User className="h-5 w-5" />;
    }
  };

  return (
    <Card className="w-[450px] bg-white shadow-lg">
      <CardHeader className="pb-2">
        <CardTitle className="text-2xl font-bold text-center">
          {forgotPasswordMode
            ? "Réinitialiser le mot de passe"
            : "Bienvenue à EduSmart"}
        </CardTitle>
        {!forgotPasswordMode && (
          <p className="text-center text-muted-foreground">
            Connectez-vous pour accéder à votre compte
          </p>
        )}
      </CardHeader>
      <CardContent>
        {!forgotPasswordMode && (
          <Tabs
            defaultValue="student"
            value={activeTab}
            onValueChange={(value) => setActiveTab(value as UserRole)}
            className="mb-6"
          >
            <TabsList className="grid grid-cols-4 w-full">
              <TabsTrigger
                value="student"
                className="flex items-center justify-center gap-2"
              >
                <School className="h-4 w-4" />
                <span className="hidden sm:inline">Élève</span>
              </TabsTrigger>
              <TabsTrigger
                value="teacher"
                className="flex items-center justify-center gap-2"
              >
                <Users className="h-4 w-4" />
                <span className="hidden sm:inline">Enseignant</span>
              </TabsTrigger>
              <TabsTrigger
                value="parent"
                className="flex items-center justify-center gap-2"
              >
                <User className="h-4 w-4" />
                <span className="hidden sm:inline">Parent</span>
              </TabsTrigger>
              <TabsTrigger
                value="admin"
                className="flex items-center justify-center gap-2"
              >
                <UserCog className="h-4 w-4" />
                <span className="hidden sm:inline">Admin</span>
              </TabsTrigger>
            </TabsList>

            {["student", "teacher", "parent", "admin"].map((tab) => (
              <TabsContent key={tab} value={tab}>
                <div className="flex items-center justify-center mb-4 mt-2">
                  <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                    {getUserIcon()}
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        )}

        {error && (
          <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-md mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder="your.email@example.com"
                className="pl-9"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          {!forgotPasswordMode && (
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label htmlFor="password" className="text-sm font-medium">
                  Mot de passe
                </label>
                <button
                  type="button"
                  className="text-xs text-primary hover:underline"
                  onClick={() => setForgotPasswordMode(true)}
                >
                  Mot de passe oublié ?
                </button>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="pl-9"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-2.5 text-muted-foreground"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>
          )}

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                Chargement...
              </div>
            ) : forgotPasswordMode ? (
              "Envoyer le lien de réinitialisation"
            ) : (
              "Se connecter"
            )}
          </Button>

          {forgotPasswordMode && (
            <Button
              type="button"
              variant="outline"
              className="w-full mt-2"
              onClick={() => setForgotPasswordMode(false)}
            >
              Retour à la connexion
            </Button>
          )}
        </form>

        {!forgotPasswordMode && (
          <div className="mt-6 text-center text-sm">
            <p className="text-muted-foreground">
              Vous n'avez pas de compte ?{" "}
              <a href="#" className="text-primary hover:underline">
                Contactez votre administrateur
              </a>
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AuthenticationCard;
