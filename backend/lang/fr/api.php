<?php

return [
    'errors' => [
        'acting_user_required' => 'Utilisateur courant requis dans l\'en-tête X-User-Id.',
        'acting_user_not_found' => 'Utilisateur courant introuvable.',
        'permission_denied' => 'Permission refusée pour cette action.',
        'admin_only' => 'Action réservée à l\'administrateur.',
    ],
    'projects' => [
        'created' => 'Projet créé avec succès.',
        'updated' => 'Projet mis à jour.',
        'private_cannot_be_public' => 'Un projet privé ne peut pas être rendu public.',
    ],
    'quotes' => [
        'created' => 'Devis créé avec succès.',
        'updated' => 'Devis mis à jour.',
    ],
    'users' => [
        'roles_updated' => 'Rôles utilisateur mis à jour.',
        'reset_mail_sent' => 'Email de réinitialisation envoyé à :email.',
        'only_owner_password' => 'Seul l\'utilisateur concerné peut changer son mot de passe.',
        'password_changed' => 'Mot de passe mis à jour avec succès.',
    ],
];
