# References:
# http://blog.zerosharp.com/setting-up-octopress-on-windows-again/
# http://www.techelex.org/setup-octopress-on-windows7/
# http://misheska.com/blog/2013/03/10/using-pik-to-manage-multiple-versions-of-ruby-on-windows/
# http://puneetpandey.com/tag/how-to-install-devkit-on-windows/
# https://github.com/vertiginous/pik
# http://www.badrit.com/blog/2011/1/20/installing-redcloth-gem-on-windows-7-64-bit
# https://github.com/oneclick/rubyinstaller/wiki/Development-Kit

# Install Chocolatey packages
cinst packages.config

# Install ruby version 1.9.2
pik install 1.9.2

# Use the 1.9.2 version
pik use 192
# NOTE: Default is not yet supported in the version of pik on Chocolatey
# pik use 192 --default

# Initialize dev kit (needed so that config.yml is created)
ruby C:\bin\DevKit\dk.rb init

# MANUAL: Add C:/Users/matthewb/.pik/rubies/Ruby-192-p290 to C:\bin\Devkit\config.yml
Write-Host "Modify the config.yml file to include the 192 ruby installed by pik."
Read-Host

# Install devkit
ruby C:\bin\DevKit\dk.rb install

# Install bundler and bundled gems
gem install bundler
bundle install
