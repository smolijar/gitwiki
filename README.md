![Gitwiki](https://i.imgur.com/Js5Y9dU.png)

Gitwiki is a git based wiki system with in-repository permisison control, web user interface and Git CLI over SSH access.

# About
It uses [Gitolite](http://gitolite.com/gitolite/index.html) authorization layer allowing complex, in-repository access control.

Gitwiki is part of an implementation for the [Git-based Wiki System](https://github.com/grissius/gitwiki-thesis).

It uses [Emily editor](https://github.com/grissius/emily-editor) for document editting.


# Install
The installation process is complicated, because repository hosting service over SSHd must be established.

## Gitolite

### Gitolite installation

This installation prociess is thoroughly explained [here](http://gitolite.com/gitolite/fool_proof_setup/).
Here is a step-by-step solution for Debian-based distributions.

Generate SSH keys:

```sh
# install git, sshd
sudo apt-get install openssh-server git
# generate a keypair for administration
ssh-keygen -t rsa -b 4096 -C "gitolite-admin" -f "$HOME/.ssh/gitolite-admin"
# copy the "~/.ssh/gitolite-admin.pub" for gitolite setup
cp ~/.ssh/gitolite-admin.pub /tmp
```

Install Gitolite:

```sh
# create new `git` user with home directory and set password
sudo useradd -m git
sudo passwd git

# switch to git user
su - git

# download and install gitolite
cd $HOME
git clone https://github.com/sitaramc/gitolite
mkdir -p bin
gitolite/install -to $HOME/bin # use abs path in argument

# setup gitolite with copied admin key from workstation
$HOME/bin/gitolite setup -pk /tmp/gitolite-admin.pub
```
### Additional Gitolite setup
Wee need gitwiki to be able to access Gitolite.
If you will be running gitwiki from a different user (assume username `jack`), you must perform additional setup.

Create group, add users *git*, *jack*, allow to write in `/home/git/.gitolite`
```sh
sudo groupadd gitolite
sudo usermod -a -G gitolite jack
sudo usermod -a -G gitolite git
sudo chgrp -R gitolite /home/git/
sudo chmod -R 2775 /home/git/.gitolite
```

Set `setgid` bit

```sh
chmod g+s /home/git/
```

Set default permissions for new log files

```sh
sudo setfacl -d -m g::rwx /home/git/.gitolite/logs/
```

## Gitwiki

### Install
```sh
npm install
```

### Setup
#### Authentication

1. [Register a new OAuth application](https://github.com/settings/applications/new)
    - Set callback to `<host>/api/v1/auth/github/cb`
2. Remember `client_id` and `client_secret`

#### Configuration

Create a `.gitwiki.config.js` and fill the data as in `.gitwiki.config.example.js`.

```js
module.exports = {
  auth: {
    oauth2: {
      github: {
        // Information from the newly registered app
        client_id: '...',
        client_secret: '...',
      }
    }
  },
  gitolite: {
    // Path to gitolite bin
    bin: '/home/git/bin/gitolite',
    // Home directory of the gitolite's user
    home: '/home/git',
  },
  // Valid storage path for keyv(https://github.com/lukechilds/keyv)
  storage: 'sqlite:///home/git/database.sqlite',
};
```

# Running

1. Add ssh key identity `ssh-add ~/.ssh/gitolite-admin` (path to private key you configured gitolite with)
2. `npm run start`

# Usage

## Repository providers

- Gitolite
- GitHub

To access GitHub repositories, you will be prompted to enter your _personal access token_ in repository index. When provided, you can access your GitHub repositories apart from the default local (gitolite) repositories.

## Adding SSH keys

TODO

## Permission control

This option is only available for Gitolite provider, for self-hosted repos.
After a succesful Gitolite setup, there is a repository `gitolite-admin`, where you can add users and chagne their permissions.
If you are new to Gitolite, see [Basic administration](http://gitolite.com/gitolite/basic-admin/) manual.

# License

This project is licensed under the [MIT license](./LICENSE).