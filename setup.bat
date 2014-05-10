@echo off
powershell -NoProfile -ExecutionPolicy Bypass -Command "& '%~dp0\setup.ps1' %*"
