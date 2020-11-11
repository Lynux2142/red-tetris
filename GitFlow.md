 contient les développements courants. Toutes les *Branches* de Features partent de la *Branche* **Dev**. De plus aucune *Branche* de Feature doit avoir plus de 15 jours avant de se refondre dans la *Branche* **Dev**.

On l'appelera dans la suite de ce document simplement par **DEV**.

sa Semantique est:  
**dev**

## Branches Features

Les *Branches* Features contiennent les développements. Chaque *Branche* tacle un sujet simple et rapide (moins de 5 jours de dev).
Une personne est en charge de la chaque *Branche* et doit s'assurer de pouvoir la refondre tous les 15 jours au plus tard dans **Dev**.
La nommenclatrure des *Branches* est : Feature/NomDeLaFeature ou Feature/Nom_de_la_feature.

Sa Sementique est la suivante:  
***\<INITIALES DU CRÉATEUR DE LA BRANCHE>/\<TYPE DE BRANCHE>/\<Nommage de la Branche>***
Exemple:  
  - pour une branche de Feature créée par Edouard Xavier sur une l'ajout de la page XX:
    - ***EX/FEATURE/AddXXPage***

## Branches de Fix et de Hotfix

Un Hotfix est réalisé en partant directement de **Master** pour pouvoir être déployé
rapidement. 

**DEV** sera ensuite rebasée depuis **Master**.

Une Fix est elle faite dans **Dev** et sera déployé durant la prochaine **MEP** du **Service**.

Sa Semantique est la suivante:  
***\<INITIALES DU CRÉATEUR DE LA BRANCHE>/\<FIX || HOTFIX>/\<Numero Issue Git>/\<Nom de l'élement a fixer>***

Exemple:  
  - pour une branche de Fix créée par Jean Bon sur la feature Sparkle referencée #18 sur github:
    - **JB/FIX/18/Sparkle**

## Sémantique Commits Git :

Pour chaque commit, la semantique est la suivante:
 
COMMIT_TAG: Fichiers ou composants Impactés **\>** Message d'explication court

Exemple:  
  - pour un ajout de classe css (External Border) dans le composant main-page:
    - ADD: MainPageComponent > css class External-Border
        
### Types de tags :
 
 * TAGS risquants de casser des fonctionalitées:
 ```
    * ADD : Lors d'un ajout de nouvelle classe, fonctions, fichier, dépendances. Nous ajoutons une nouvelle fonctionalité
    * MOD : Modification d'une classe, fonction, etc. Nous modifions une fonctionnalité existante.
    * MIN : Modification mineure, celle-ci ne modifie pas les interfaces de classe, fonctions, etc. C'est une modification qui ne change pas fortement la fonctionnalité.
    * REM : On efface une classe, fonction, dépendance. On efface des fichiers, et des fonctionnalitées.
 ``` 
 
 * TAGS qui ne **DOIVENT** rien casser: 
 
 ```
 * SAN : Lors d'un ré-usinage, nettoyage du code etc. On ne change pas du tout la fonctionnalité, on nettoie notre code, projets, etc.
 * DOC : On ne fait que de la documentation technique
 
 * FIX : Debug
```
