Il faudra beaucoup de javascript pour le site.
Je garde les couleurs sombre car je trouve qu'elle sont plus facile a mettre en place.

En implémentant en sass, je pourrais crée un différent jeu de couleurs si nécessaire.

# To add to the Mood board

http://www.cleverbirds.com/ + Content seperation with small animation.
https://p.ota.to/ + Header top right
https://www.akqa.com/ + Big text areas, Big images - Pas très clair
http://www.yurz.com/ Parralax sympa
https://seriftemplates.com/parallax-webplus-template.html parallax with great grayscale images
https://trace.risingstack.com/ uses particle.js in a good way

Le projet se démarquera dans la réalisation avec la création d'animation.

# Logo

Faire un logo avec CPNV, un livre, et ES

# Icones

Je ne penses pas crée d'icone particulière. Je vais néenmoins utiliser plusieurs set d'icones.

Notamment fontawesome, comme son nom l'indique est génial. Il a un set d'icone très plat et facile à intégrer.
Je vais aussi utiliser les icons material design. Actuellement presque tout est fait pour et sur mobile. Réutiliser les icones venant du milieu serait des plus judicieux.

# Image personalisé

3 images sont disponible. Chaque image sera utilisé pcomme image de garde lors de l'introduction des différentes formation. Aute que cela je ne penses pas utilisé plus d'image.

# Acceuil

La page d'acceuil sera changé légérement. J'ai décidé de faire un sorte de page d'acceuil facile à comprendre.
Pour cela quoi de plus simple que quelque liens pour permettre de naviguer au premier plan.

J'ai néenmoins révisé la manière dont est disposé le contenu. Il faut que la page attire l'oeuil, mais aussi que l'on comprenne que c'est un site d'une école.
Précédamment le Hero était une simple image avec un petit texte. J'ai revu ça en y ajoutant des tiles animé

## Hero

La première section, le Hero, je ne me suis pas encore décidé. Je suis passé sur plusieurs iteration. Une avec juste une image de fond et du texte.

- Une avec particle.js, et seulement du texte.
- Une avec particle.js, une vidéo d'arrière plan, et du texte.
- Une avec particle.js et un gradient de background vert.

Le probleme avec toute ces iteration, c'est qu'il n'y en a aucune qui est très catchy.

La meilleures option reste l'image avec particlejs. Meme si l'image n'est pas très bien choisi.


Hero soit avec http://vincentgarreau.com/particles.js/
Ou https://github.com/qrohlf/trianglify

# Page standard

Les page dite de contenu auront un effet parralax. L'idée là est de crée des image avec des gaussian blur.

## Page de Stage

J'ai décidé de faire la page de stage plus simple. Elle sera divisé en 2 partie, et non pas en 2 page comme je l'avais initialement prévu.
Cela requiert d'etre agile avec le contenu. Il sera séparé en 2 tabs différent (les tabs se réduiront lors du scroll par exemple, un genre de parralax).

En deuxième version. J'ai décidé de le faire 100% par parralax. Cela permet de séparer les sections avec des images, et pas besoins de faire des animations trop compliqué.

## Page de formation

Les formations sera aussi divisé en 3 tabs.

# Integration

Le site sera construi pour etre facilement intégré à des système de templates (jade, blade).

L'integration avec des theme de CMS, peux se faire mais est beaucoup plus complexe.

# Organisation du code

config and paths :
```json
{
  "styles":"./src/sass/**/*.+(sass|scss)",
  "scripts":"src/js/**/*.+(js|jsx)",
  "bootstrap":"./node_modules/bootstrap-sass/assets/",
  "material" : "./node_modules/materialize-css/",
  "fontawesome":"./node_modules/font-awesome/",
  "animatecss":"./node_modules/animate-sass/",
  "jquery":"./node_modules/jquery/",
  "images": "./src/images/**/*.*",
  "templates": "./src/**.html"
}
```


 - sass
  - app.sass : imports all the components
  - components
  - layout
- js
