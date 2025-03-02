import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { School, BookOpen, Users, UserCog } from "lucide-react";
import AuthenticationCard from "./auth/AuthenticationCard";
import { useAuth } from "@/context/AuthContext";

const Home = () => {
  const { login, isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState("login");

  // If already authenticated, redirect will happen via AuthContext

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <School className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold text-primary">EduSmart</h1>
          </div>
          <div className="hidden md:flex space-x-4">
            <Button variant="ghost" asChild>
              <Link to="#features">Fonctionnalités</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link to="#about">À propos</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link to="#contact">Contact</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-12 flex flex-col md:flex-row items-center justify-center gap-12">
        {/* Left side - Welcome text */}
        <div className="md:w-1/2 space-y-6">
          <h2 className="text-4xl font-bold text-gray-900">
            Bienvenue à EduSmart
          </h2>
          <p className="text-xl text-gray-600">
            Le système complet de gestion scolaire qui connecte les élèves, les
            enseignants, les parents et les administrateurs.
          </p>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="mt-1 bg-primary/10 p-2 rounded-full">
                <BookOpen className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium">Apprentissage centralisé</h3>
                <p className="text-gray-600">
                  Accédez à toutes les ressources éducatives au même endroit
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="mt-1 bg-primary/10 p-2 rounded-full">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium">Communication améliorée</h3>
                <p className="text-gray-600">
                  Restez connecté avec toute la communauté scolaire
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="mt-1 bg-primary/10 p-2 rounded-full">
                <UserCog className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium">Administration efficace</h3>
                <p className="text-gray-600">
                  Simplifiez les opérations et la gestion de l'école
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Authentication */}
        <div className="md:w-1/2 w-full max-w-md">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="login">Connexion</TabsTrigger>
              <TabsTrigger value="demo">Démo</TabsTrigger>
            </TabsList>
            <TabsContent value="login" className="mt-0">
              <AuthenticationCard />
            </TabsContent>
            <TabsContent value="demo" className="mt-0">
              <Card>
                <CardContent className="p-6 space-y-4">
                  <h3 className="text-xl font-bold text-center">
                    Essayez un compte démo
                  </h3>
                  <p className="text-center text-muted-foreground">
                    Découvrez EduSmart avec l'un de nos comptes démo
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                    <Button
                      variant="outline"
                      className="h-auto py-6 flex flex-col items-center justify-center gap-2"
                      onClick={() =>
                        login("student@demo.com", "password", "student")
                      }
                    >
                      <School className="h-8 w-8" />
                      <span className="font-medium">Élève</span>
                      <span className="text-xs text-muted-foreground">
                        Voir les devoirs et les notes
                      </span>
                    </Button>
                    <Button
                      variant="outline"
                      className="h-auto py-6 flex flex-col items-center justify-center gap-2"
                      onClick={() =>
                        login("teacher@demo.com", "password", "teacher")
                      }
                    >
                      <Users className="h-8 w-8" />
                      <span className="font-medium">Enseignant</span>
                      <span className="text-xs text-muted-foreground">
                        Gérer les classes et les notes
                      </span>
                    </Button>
                    <Button
                      variant="outline"
                      className="h-auto py-6 flex flex-col items-center justify-center gap-2"
                      onClick={() =>
                        login("parent@demo.com", "password", "parent")
                      }
                    >
                      <Users className="h-8 w-8" />
                      <span className="font-medium">Parent</span>
                      <span className="text-xs text-muted-foreground">
                        Suivre les progrès de l'enfant
                      </span>
                    </Button>
                    <Button
                      variant="outline"
                      className="h-auto py-6 flex flex-col items-center justify-center gap-2"
                      onClick={() =>
                        login("admin@demo.com", "password", "admin")
                      }
                    >
                      <UserCog className="h-8 w-8" />
                      <span className="font-medium">Admin</span>
                      <span className="text-xs text-muted-foreground">
                        Superviser les opérations scolaires
                      </span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 py-8 border-t">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <School className="h-6 w-6 text-primary" />
                <h3 className="text-lg font-bold text-primary">EduSmart</h3>
              </div>
              <p className="text-gray-600">
                Transformer l'éducation grâce à des solutions technologiques
                innovantes.
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-4">Fonctionnalités</h4>
              <ul className="space-y-2 text-gray-600">
                <li>Outils administratifs</li>
                <li>Gestion de l'apprentissage</li>
                <li>Plateforme de communication</li>
                <li>Suivi des présences</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-4">Ressources</h4>
              <ul className="space-y-2 text-gray-600">
                <li>Documentation</li>
                <li>Tutoriels</li>
                <li>Centre d'assistance</li>
                <li>Forum communautaire</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-600">
                <li>info@edusmart.com</li>
                <li>+1 (555) 123-4567</li>
                <li>123 Education St, Suite 100</li>
                <li>San Francisco, CA 94103</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t text-center text-gray-500">
            <p>© 2023 EduSmart. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
