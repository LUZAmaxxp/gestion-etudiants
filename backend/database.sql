-- Création de la base de données
CREATE DATABASE IF NOT EXISTS gestion_etudiants;
USE gestion_etudiants;

-- Création de la table etudiant
CREATE TABLE IF NOT EXISTS etudiant (
    id INT PRIMARY KEY,
    nom VARCHAR(100) NOT NULL,
    prenom VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    tel VARCHAR(20) NOT NULL UNIQUE,
    date_naissance DATE NOT NULL,
    filiere VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insertion de quelques données de test
INSERT INTO etudiant (nom, prenom, email, tel, date_naissance, filiere) VALUES
('Dupont', 'Jean', 'jean.dupont@email.com', '0123456789', '1995-03-15', 'Informatique'),
('Martin', 'Marie', 'marie.martin@email.com', '0987654321', '1997-07-22', 'Mathématiques'),
('Bernard', 'Pierre', 'pierre.bernard@email.com', '0555666777', '1996-11-08', 'Physique'),
('Petit', 'Sophie', 'sophie.petit@email.com', '0444333222', '1998-05-30', 'Chimie'),
('Robert', 'Lucas', 'lucas.robert@email.com', '0333222111', '1994-12-10', 'Biologie');

-- Index pour améliorer les performances de recherche
CREATE INDEX idx_nom_prenom ON etudiant(nom, prenom);
CREATE INDEX idx_email ON etudiant(email);
CREATE INDEX idx_tel ON etudiant(tel); 
