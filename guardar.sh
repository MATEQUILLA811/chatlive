#!/bin/sh

git status
# Agrega los archivos modificados al área de preparación
git add .

# Confirma los cambios
git commit -m "MIAU"

# Empuje los cambios a GitHub
git push origin master

# ./guardar.sh