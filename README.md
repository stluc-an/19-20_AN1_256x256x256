# Atelier programmation
## ::: B  R  I  E  F  I  N  G ::: 256  x   256   x  256
E  S  A     ·     A  N  1  ·    ·    ·  0  7  /  0  2  /  2  0     ·     1  3  /  0  3  /  2  0 

* [Objectifs](#objectifs-)
* [Contraintes ](#contraintes-)
* [En classe](#en-classe-)
* [Chez vous](#chez-vous-)
* [Description](#description-)
* [Règles](#règles-)
* [Nomenclature](#nomenclature-)
* [Attributions](#attributions-)
* [Lien vers l'app](#lien-vers-lapp-)

### OBJECTIFS :    
* Produire à 26, 256 espaces interactifs dont la dimension est fixée à 256 pixels sur 256 pixels.
* Explorer le potentiel ludique de 16 interactions.
* Développer nos compréhensions du potentiel de l'environnement web.
* Collaborer et s'identifier par rapport aux autres, en créant des espaces différents dans un but commun avec une structure commune.
* Réflexion sur le design «call to action» 
    * Clair 
    * Rapide à comprendre
    * Efficace
    * Sans texte
* **Nous exposons ce projet commun produit de nos individualités aux portes ouvertes de l’école**.

### CONTRAINTES : 
* **Techno :** WEB > HTML + CSS + Javascript
* **Dimension :** 256 x 256 pixels
* **Durée :** chacun des espaces sera vu par l'utilisateur 14 secondes
* **Quantité :** chacun de vous développe au minimum 10 espaces interactifs
* **Interaction :** chaque espace interactif demande à l'utilisateur de produire 2 actions dans un certain ordre

<img src="./public/images/2020.interactions.jpg" alt="tableau d'interaction" height="500">

### EN CLASSE :   
* Nous explorons chacune des 16 interactions :
    * Définition
    * Technique
    * Utilisation
* Nous mettons en place un canvas de développement de vos espaces interactifs.
* Nous répondons aux questions relatives à votre production.
* Nous discutons de la pertinence de votre production.
* Nous intégrons nos espaces au dispositif capable de parcourir ceux-ci.

### CHEZ VOUS :   
* Vous conceptualisez vos 10 espaces interactifs (être capable de décrire chacun en français par écrit)
* Vous dessinez vos 10 espaces interactifs
* Vous développez vos 10 espaces interactifs

### DESCRIPTION : 
|   ID  | Action      | Définition           |
|:-----:|:----------- | -------------------- |
| **0** | `TAP`       | L’utilisateur __click avec un doigt__ sur un objet |
| **1** | `DOUBLETAP` | L’utilisateur `TAP` __2x__ en peu de temps sur un objet |
| **2** | `LONGTAP`   | L’utilisateur __presse un certain temps__ sur un objet |
| **3** | `DRAG`      | L’utilisateur met un doigt sur un objet et le __glisse__ |
| **4** | `DROPFILE`  | L’utilisateur, __glisse un fichier attendu à un endroit voulu__ |
| **5** | `MOUSEENTER`    | L’utilisateur __fait entrer le curseur de souris__ sur un objet |
| **6** | `MOUSELEAVE`  | L’utilisateur __fait sortir le curseur de souris__ d'un objet |
| **7** | `KEYUP`     | L’utilisateur __relache une touche spécifique du clavier__  |
| **8** | `KEYDOWN`     | L’utilisateur __appuie une touche spécifique du clavier__ |
| **9** | `HIDE`     | L’utilisateur __cache__ la fenêtre du son navigateur |
| **A** | `SHOW`      | L’utilisateur __affiche__ la fenêtre du son navigateur |
| **B** | `WINDOWRISIZE`     | L’utilisateur __redimensionne__ la fenêtre du navigateur |
| **C** | `BEFOREPRINT`    | L’utilisateur demande à son navigateur __d'imprimer la page courante__ |
| **D** | `SCROLL`    | L’utilisateur __scroll__ en visant un objet | 
| **E** | `TIMEOUT`   | L’utilisateur __attend__ un certain temps |
| **F** | `SOUND`    | L’utilisateur __fait du bruit__ au dela d'un certain niveau sonore |

### RÈGLES : 
* L'utilisateur a pour but de **parcourir en moins d'une heure les 256 espces interactifs.**
* Pour cela, il dispose d'une page web qui encapsule tout ces espaces interactifs, appelons la : **Mécanique temporelle**.
* Au commencemant, la Mécanique temporelle affiche un espace interactif tiré au hazard. L'utilisateur doit alors **accomplir deux actions**. 
* Si l'utilisateur parvient à accomplir dans l'ordre les deux actions assignées à cet espace, **la Mécanique temporelle est notifiée. Elle referme cet espace, en sélectionne un nouveau encore à résoudre** et l'histoire continue. `AppManager.levelComplete();`
* Si l'utilisateur ne parvient pas à résoudre cet espace en moins de 14 secondes, alors **la Mécanique temporelle referme automatiquement cet espace et ouvre l'espace précédent.** 

### NOMENCLATURE : 
Chaque espace est nomé suivant la règle suivante : <br/>
"0x"+`Id_Action_1`+`Id_Action_2`
> _exemple :_ <br/>
> ... la première action à acomplir est `LONGTAP` qui à pour Id **2**<br/>
> ... la seconde action à acomplir est `WINDOWRISIZE` qui à pour Id **B**<br/>
> ... cet espace porte le nom **0x2B**

### ATTRIBUTIONS :
La colonne Acronyme vous identifie, elle contient des trigrammes composés au moyen de vos prénoms et noms. La première lettre du prénom suivie des 2 premières lettres du nom de famille. Pour les noms composés, on prend la première lettre de chaque patronyme jusqu'à composition du trigramme.
> _exemple :_ <br/>
> ... Vincent Evrard - **VEV**


|  Trigramme | Espaces à votre charge   |
|:---------- |:------------------------ |
| [**GAN**](https://stluc-an.github.io/19-20_AN1_256x256x256/src/0xFFF/index.html?lvl=["0xFB", "0xD1", "0x5B", "0xFC", "0x5C", "0x38", "0x86", "0x0F", "0xE3", "0x00"]) | 0xFB · 0xD1 · 0x5B · 0xFC · 0x5C · 0x38 · 0x86 · 0x0F · 0xE3 · 0x00 | 
| [**EBE**](https://stluc-an.github.io/19-20_AN1_256x256x256/src/0xFFF/index.html?lvl=["0xD4", "0x0A", "0x52", "0x90", "0x1E", "0xDC", "0x16", "0x27", "0x0E", "0xD6"]) | 0xD4 · 0x0A · 0x52 · 0x90 · 0x1E · 0xDC · 0x16 · 0x27 · 0x0E · 0xD6 | 
| [**MCO**](https://stluc-an.github.io/19-20_AN1_256x256x256/src/0xFFF/index.html?lvl=["0x03", "0x1F", "0x94", "0x19", "0x47", "0x08", "0xE1", "0xF7", "0xD7", "0x3F"]) | 0x03 · 0x1F · 0x94 · 0x19 · 0x47 · 0x08 · 0xE1 · 0xF7 · 0xD7 · 0x3F | 
| [**TCO**](https://stluc-an.github.io/19-20_AN1_256x256x256/src/0xFFF/index.html?lvl=["0x78", "0x32", "0x3E", "0x14", "0x3D", "0x29", "0x2F", "0xFF", "0x3C", "0x9C"]) | 0x78 · 0x32 · 0x3E · 0x14 · 0x3D · 0x29 · 0x2F · 0xFF · 0x3C · 0x9C | 
| [**FHC**](https://stluc-an.github.io/19-20_AN1_256x256x256/src/0xFFF/index.html?lvl=["0xE5", "0x39", "0x7A", "0xFA", "0x0D", "0xFE", "0x3B", "0xF3", "0x79", "0x8E"]) | 0xE5 · 0x39 · 0x7A · 0xFA · 0x0D · 0xFE · 0x3B · 0xF3 · 0x79 · 0x8E | 
| [**ADA**](https://stluc-an.github.io/19-20_AN1_256x256x256/src/0xFFF/index.html?lvl=["0x36", "0x06", "0x8D", "0x15", "0x80", "0x01", "0xE2", "0xE6", "0xEE", "0x4C"]) | 0x36 · 0x06 · 0x8D · 0x15 · 0x80 · 0x01 · 0xE2 · 0xE6 · 0xEE · 0x4C | 
| [**LDE**](https://stluc-an.github.io/19-20_AN1_256x256x256/src/0xFFF/index.html?lvl=["0x54", "0xAD", "0xF9", "0x11", "0x63", "0x13", "0xFD", "0x88", "0x00", "0x12"]) | 0x54 · 0xAD · 0xF9 · 0x11 · 0x63 · 0x13 · 0xFD · 0x88 · 0x00 · 0x12 | 
| [**JDE**](https://stluc-an.github.io/19-20_AN1_256x256x256/src/0xFFF/index.html?lvl=["0x62", "0x35", "0x0F", "0xA1", "0x95", "0x9B", "0x33", "0x66", "0x28", "0x20"]) | 0x62 · 0x35 · 0x0F · 0xA1 · 0x95 · 0x9B · 0x33 · 0x66 · 0x28 · 0x20 | 
| [**TDR**](https://stluc-an.github.io/19-20_AN1_256x256x256/src/0xFFF/index.html?lvl=["0x02", "0x51", "0x8F", "0xA5", "0x09", "0x6B", "0x85", "0x9F", "0x68", "0x05"]) | 0x02 · 0x51 · 0x8F · 0xA5 · 0x09 · 0x6B · 0x85 · 0x9F · 0x68 · 0x05 | 
| [**AEH**](https://stluc-an.github.io/19-20_AN1_256x256x256/src/0xFFF/index.html?lvl=["0x0B", "0x53", "0xA0", "0xAC", "0x12", "0x84", "0xAE", "0x69", "0x97", "0x99"]) | 0x0B · 0x53 · 0xA0 · 0xAC · 0x12 · 0x84 · 0xAE · 0x69 · 0x97 · 0x99 | 
| [**AFR**](https://stluc-an.github.io/19-20_AN1_256x256x256/src/0xFFF/index.html?lvl=["0x83", "0x4E", "0x50", "0x55", "0xBD", "0x10", "0x98", "0x10", "0x9E", "0x9D"]) | 0x83 · 0x4E · 0x50 · 0x55 · 0xBD · 0x10 · 0x98 · 0x10 · 0x9E · 0x9D | 
| [**HHA**](https://stluc-an.github.io/19-20_AN1_256x256x256/src/0xFFF/index.html?lvl=["0x11", "0x60", "0xB6", "0x92", "0xA2", "0x42", "0x07", "0x61", "0x8A", "0x08"]) | 0x11 · 0x60 · 0xB6 · 0x92 · 0xA2 · 0x42 · 0x07 · 0x61 · 0x8A · 0x08 | 
| [**THE**](https://stluc-an.github.io/19-20_AN1_256x256x256/src/0xFFF/index.html?lvl=["0x04", "0x0B", "0x8B", "0x87", "0x9A", "0x41", "0x25", "0x64", "0x82", "0x91"]) | 0x04 · 0x0B · 0x8B · 0x87 · 0x9A · 0x41 · 0x25 · 0x64 · 0x82 · 0x91 | 
| [**LKN**](https://stluc-an.github.io/19-20_AN1_256x256x256/src/0xFFF/index.html?lvl=["0xAF", "0x17", "0x65", "0x22", "0x89", "0x81", "0x93", "0x4F", "0x49", "0x23"]) | 0xAF · 0x17 · 0x65 · 0x22 · 0x89 · 0x81 · 0x93 · 0x4F · 0x49 · 0x23 | 
| [**ELY**](https://stluc-an.github.io/19-20_AN1_256x256x256/src/0xFFF/index.html?lvl=["0x0C", "0x02", "0x70", "0xB8", "0x2A", "0x46", "0x5D", "0x18", "0xEB", "0xF0"]) | 0x0C · 0x02 · 0x70 · 0xB8 · 0x2A · 0x46 · 0x5D · 0x18 · 0xEB · 0xF0 | 
| [**ANI**](https://stluc-an.github.io/19-20_AN1_256x256x256/src/0xFFF/index.html?lvl=["0x4D", "0x58", "0x31", "0xB4", "0x67", "0x45", "0x0A", "0xB0", "0x1B", "0xD8"]) | 0x4D · 0x58 · 0x31 · 0xB4 · 0x67 · 0x45 · 0x0A · 0xB0 · 0x1B · 0xD8 | 
| [**ANN**](https://stluc-an.github.io/19-20_AN1_256x256x256/src/0xFFF/index.html?lvl=["0xCA", "0x57", "0x13", "0xBC", "0x4B", "0xE0", "0x72", "0xCC", "0x43", "0x07"]) | 0xCA · 0x57 · 0x13 · 0xBC · 0x4B · 0xE0 · 0x72 · 0xCC · 0x43 · 0x07 | 
| [**QPO**](https://stluc-an.github.io/19-20_AN1_256x256x256/src/0xFFF/index.html?lvl=["0xA7", "0x09", "0xE8", "0x5A", "0x17", "0x15", "0xCB", "0x76", "0x8C", "0x6E"]) | 0xA7 · 0x09 · 0xE8 · 0x5A · 0x17 · 0x15 · 0xCB · 0x76 · 0x8C · 0x6E | 
| [**SRA**](https://stluc-an.github.io/19-20_AN1_256x256x256/src/0xFFF/index.html?lvl=["0x7E", "0x26", "0xF1", "0xDB", "0xF5", "0x6A", "0x4A", "0x56", "0xB2", "0x0D"]) | 0x7E · 0x26 · 0xF1 · 0xDB · 0xF5 · 0x6A · 0x4A · 0x56 · 0xB2 · 0x0D | 
| [**MSA**](https://stluc-an.github.io/19-20_AN1_256x256x256/src/0xFFF/index.html?lvl=["0xAB", "0xD3", "0xCD", "0x3A", "0x6D", "0x40", "0x7B", "0x2C", "0xBB", "0xE7"]) | 0xAB · 0xD3 · 0xCD · 0x3A · 0x6D · 0x40 · 0x7B · 0x2C · 0xBB · 0xE7 | 
| [**CMG**](https://stluc-an.github.io/19-20_AN1_256x256x256/src/0xFFF/index.html?lvl=["0xE9", "0x7C", "0xC4", "0x7D", "0x5E", "0x6C", "0x04", "0xC6", "0x7F", "0xC1"]) | 0xE9 · 0x7C · 0xC4 · 0x7D · 0x5E · 0x6C · 0x04 · 0xC6 · 0x7F · 0xC1 | 
| [**JSE**](https://stluc-an.github.io/19-20_AN1_256x256x256/src/0xFFF/index.html?lvl=["0x16", "0x2B", "0xB3", "0x77", "0xA6", "0x0E", "0xEC", "0xCE", "0xEA", "0xB1"]) | 0x16 · 0x2B · 0xB3 · 0x77 · 0xA6 · 0x0E · 0xEC · 0xCE · 0xEA · 0xB1 | 
| [**TSI**](https://stluc-an.github.io/19-20_AN1_256x256x256/src/0xFFF/index.html?lvl=["0xEF", "0xF8", "0xB9", "0x6F", "0xC5", "0x06", "0xC9", "0xC2", "0xA4", "0x73"]) | 0xEF · 0xF8 · 0xB9 · 0x6F · 0xC5 · 0x06 · 0xC9 · 0xC2 · 0xA4 · 0x73 | 
| [**AST**](https://stluc-an.github.io/19-20_AN1_256x256x256/src/0xFFF/index.html?lvl=["0x14", "0x71", "0x2E", "0xB5", "0xA8", "0x44", "0xF6", "0x59", "0x5F", "0x05"]) | 0x14 · 0x71 · 0x2E · 0xB5 · 0xA8 · 0x44 · 0xF6 · 0x59 · 0x5F · 0x05 | 
| [**STO**](https://stluc-an.github.io/19-20_AN1_256x256x256/src/0xFFF/index.html?lvl=["0xA3", "0xC3", "0xDF", "0x0C", "0x74", "0xBE", "0x75", "0xBA", "0xC0", "0xF2"]) | 0xA3 · 0xC3 · 0xDF · 0x0C · 0x74 · 0xBE · 0x75 · 0xBA · 0xC0 · 0xF2 | 
| [**STR**](https://stluc-an.github.io/19-20_AN1_256x256x256/src/0xFFF/index.html?lvl=["0xA9", "0xF4", "0x24", "0xBF", "0xD2", "0xDD", "0x1A", "0xC7", "0xCF", "0xB7"]) | 0xA9 · 0xF4 · 0x24 · 0xBF · 0xD2 · 0xDD · 0x1A · 0xC7 · 0xCF · 0xB7 | 
| [**ATÜ**](https://stluc-an.github.io/19-20_AN1_256x256x256/src/0xFFF/index.html?lvl=["0xAA", "0xD0", "0xE4", "0xDA", "0x2D", "0xC8", "0xDE", "0xED", "0xD9", "0x48"]) | 0xAA · 0xD0 · 0xE4 · 0xDA · 0x2D · 0xC8 · 0xDE · 0xED · 0xD9 · 0x48 |
| [**MVA**](https://stluc-an.github.io/19-20_AN1_256x256x256/src/0xFFF/index.html?lvl=["0xD5", "0x1D", "0x03", "0x21", "0x1C", "0x96", "0x30", "0x37", "0x34", "0x01"]) | 0xD5 · 0x1D · 0x03 · 0x21 · 0x1C · 0x96 · 0x30 · 0x37 · 0x34 · 0x01 |


```javascript
let nEtudiant = ...... ; 
let espaceParEtudiant = 10;

(new Array(espaceParEtudiant * nEtudiant))                          // nouveau Tableau de xxxx case
.fill(0)                                                            // ce tableau est remplit de zéros
.map((e, k)=> (
    "0x" + ((k%256) < 16 ? "0" : "") + ((k%256).toString(16)).toUpperCase()     // remplace lez zéros par le numéros de la case converti en hexa
))
.sort(() => Math.random() - 0.5)                                    // on mélange le tableau
.sort(() => Math.random() - 0.5)                                    // on mélange le tableau
.sort(() => Math.random() - 0.5)
.sort(() => Math.random() - 0.5)
.sort(() => Math.random() - 0.5)
.join("")                                                           // le tableau est fusionné en une string
.match(new RegExp(".{1,"+ espaceParEtudiant*4 +"}","g"))                            // coupe la string tous les 40 char
.map(e=>(
    e.match(new RegExp(".{1,"+ 4 +"}","g"))                         // chaque sous-element est coupé tous les 4 char 
    .join(" | ")                                                    // fusion des sous-sous-èlément par un pipe
)) 
.join("\n")                                                         // fusion des sous-èlément par un retour à la ligne
```

### LIEN VERS L'APP :


### LICENCE : 
[![License: CC BY-SA 4.0](https://img.shields.io/badge/License-CC%20BY--SA%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by-sa/4.0/)


