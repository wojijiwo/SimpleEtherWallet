# How to compile

node: 12.22.3

Install pyenv with brew to manage different Python versions: brew install pyenv
List all installable versions with pyenv install --list
Install Python 2.7.18 with pyenv install 2.7.18
List installed versions with pyenv versions
Set global python version with pyenv global 2.7.18
Add eval "$(pyenv init --path)" to ~/.zprofile (or ~/.bash_profile or ~/.zshrc, whichever you need)
Relaunch the shell and check that Python works, or run $ source ~/.zprofile (Thanks masoud soroush!)
