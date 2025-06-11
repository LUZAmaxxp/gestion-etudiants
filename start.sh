#!/bin/bash

# Script de démarrage pour l'application de gestion des étudiants

echo "🚀 Démarrage de l'application de gestion des étudiants..."
echo ""

# Vérifier si Node.js est installé
if ! command -v node &> /dev/null; then
    echo "❌ Node.js n'est pas installé. Veuillez l'installer d'abord."
    exit 1
fi

# Vérifier si MySQL est en cours d'exécution
echo "🔍 Vérification de la connexion MySQL..."
if ! mysql -u root -e "SELECT 1" &> /dev/null; then
    echo "⚠️  Attention: MySQL ne semble pas être démarré ou accessible."
    echo "   Veuillez démarrer MySQL avant de continuer."
    echo ""
fi

# Démarrer le backend
echo "📡 Démarrage du serveur backend..."
cd backend

# Vérifier si .env existe
if [ ! -f .env ]; then
    echo "📝 Création du fichier .env..."
    cp config.env .env
    echo "✅ Fichier .env créé. Veuillez vérifier la configuration si nécessaire."
fi

# Installer les dépendances si nécessaire
if [ ! -d "node_modules" ]; then
    echo "📦 Installation des dépendances backend..."
    npm install
fi

# Démarrer le serveur backend en arrière-plan
echo "🚀 Démarrage du serveur backend sur http://localhost:3000"
npm run dev &
BACKEND_PID=$!

# Attendre que le backend soit prêt
sleep 3

# Démarrer le frontend
echo "🌐 Démarrage de l'application frontend..."
cd ../frontend/gestion-etudiants-app

# Installer les dépendances si nécessaire
if [ ! -d "node_modules" ]; then
    echo "📦 Installation des dépendances frontend..."
    npm install
fi

# Démarrer le serveur frontend
echo "🚀 Démarrage du serveur frontend sur http://localhost:4200"
npm start &
FRONTEND_PID=$!

echo ""
echo "✅ Application démarrée avec succès!"
echo ""
echo "📱 Frontend: http://localhost:4200"
echo "🔧 Backend:  http://localhost:3000"
echo ""
echo "💡 Pour arrêter l'application, appuyez sur Ctrl+C"
echo ""

# Fonction pour nettoyer les processus
cleanup() {
    echo ""
    echo "🛑 Arrêt de l'application..."
    kill $BACKEND_PID 2>/dev/null
    kill $FRONTEND_PID 2>/dev/null
    echo "✅ Application arrêtée."
    exit 0
}

# Capturer Ctrl+C
trap cleanup SIGINT

# Attendre que les processus se terminent
wait 