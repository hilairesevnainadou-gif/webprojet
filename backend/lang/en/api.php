<?php

return [
    'errors' => [
        'acting_user_required' => 'Current user is required in X-User-Id header.',
        'acting_user_not_found' => 'Current user not found.',
        'permission_denied' => 'Permission denied for this action.',
        'admin_only' => 'This action is restricted to administrators.',
    ],
    'projects' => [
        'created' => 'Project created successfully.',
        'updated' => 'Project updated successfully.',
        'private_cannot_be_public' => 'A private project cannot be made public.',
    ],
    'quotes' => [
        'created' => 'Quote created successfully.',
        'updated' => 'Quote updated successfully.',
    ],
    'users' => [
        'roles_updated' => 'User roles updated successfully.',
        'reset_mail_sent' => 'Password reset email sent to :email.',
        'only_owner_password' => 'Only the owning user can change this password.',
        'password_changed' => 'Password updated successfully.',
    ],
];
