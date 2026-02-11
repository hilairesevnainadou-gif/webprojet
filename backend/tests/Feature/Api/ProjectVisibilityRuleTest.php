<?php

it('documents the business rule that a private project cannot become public', function () {
    $currentNature = 'private';
    $requestedNature = 'public';

    $canPromote = !($currentNature === 'private' && $requestedNature === 'public');

    expect($canPromote)->toBeFalse();
});
