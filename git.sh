#!/usr/bin/bash

if [ "push" = "$1" ]
then
    git add .
    git commit -n -m "$2"
    git push origin
    echo "Successfully pushed to origin"
fi;

if [ "pull" = "$1" ]
then
    git pull origin
    echo "Successfully pulled from origin"
fi;