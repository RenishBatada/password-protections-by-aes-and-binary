# password-protections-by-aes-and-binary

# AES Encryption/Decryption Webpage

# Overview

# This project provides a web-based tool for encrypting and decrypting text using AES-128 in CBC mode.

this is single webpage project that is used for you personal password encryption and decryption 

if you deal 🤝 with 10 to 20 or 100000 username and password so this is right place to explore

use this single webpage for encryption and decryption and
you can store on your note (i.e google keep note)

#example
#your password is : Abcd@156 the you should add at font and end side i.e (@dvc,@nbc) so you password now is @dvcAbcd@156@nbc 
# you take the key is : Rjktrblnel@45269
## Note : if you add prefix and post fix you have to remember that
### Encryption will be as follows (store this in your note 🗒)
01001001 01000001 01001101 01000100 01001000 01000110 01000001 01110010 01001111 01010011 01110100 01101000 01100100 01110101 01010011 00110101 00111000 00110001 01000101 01100100 01100010 01001000 01010001 01001110 00110110 01110101 01010011 01011010 01111001 01000100 01110111 01110101 01101110 01111001 01110000 01101111 01010111 00110111 01010101 01001111 01100100 00111000 01001101 00111101

### after this if you decrypt you will get
@dvcAbcd@156@nbc

# remove prefix and post fix and your password is here
Abcd@156


#Encryption
this generate the string into binary

#Decryption
this generate binary to string


Features

zConverts text to binary before encryption.

Uses AES-128 with CBC mode and PKCS5 padding.

Allows specifying an Initialization Vector (IV) and Secret Key.

Provides encrypted output in binary format.

Decrypts binary encrypted text back to the original string.

Setup

Download the crypto-js.js library and place it in the project folder.

Ensure the index.html file includes the local crypto-js.js instead of a CDN.

Open the index.html file in a web browser to use the tool.

Usage

Enter text in the encryption section and provide a secret key.

Click 'Encrypt' to get the binary encrypted output.

Copy the binary output and paste it in the decryption section.

Enter the same secret key and IV, then click 'Decrypt' to retrieve the original text.

Dependencies

CryptoJS (local version included in the project)

Notes

If no IV is provided, a default zero-based IV is used.

The key should be exactly 16 characters long (128 bits).

