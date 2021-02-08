/*
   LORSQUE l'on clique sur un onglet
       * ON RETIRE la class active de l'onglet actif
       * J'ajoute la class active à l'onglet actuel

       ON retire la class active sur le contenu actif
       j'ajoute la class active sur le contenu correspondant à mon clic
   */

let afficherOnglet = function (a, animations) {
    if (animations === undefined) {
        animations = true
    }
    let li = a.parentNode
    let div = a.parentNode.parentNode.parentNode
    let activeTab = div.querySelector('.tab-content.active')  // contenu actif
    let aAfficher = div.querySelector(a.getAttribute('href')) // contenu à afficher

    if (li.classList.contains('active')) {
        return false
    }

    div.querySelector('.tabs .active').classList.remove('active')
    li.classList.add('active')

    if (animations) {
        activeTab.classList.add('fade')
        activeTab.classList.remove('in')
        var transitionend = function () {
            this.classList.remove('fade')
            this.classList.remove('active')
            aAfficher.classList.add('active')
            aAfficher.classList.add('fade')
            aAfficher.offsetWidth
            aAfficher.classList.add('in')
            this.removeEventListener('transitionend', transitionend)
            this.removeEventListener('webkitTransitionEnd', transitionend)
            this.removeEventListener('oTransitionEnd', transitionend)
            this.removeEventListener('mozTransitionEnd', transitionend)
        }
        activeTab.addEventListener('transitionend', transitionend)
        activeTab.addEventListener('webkitTransitionEnd', transitionend)
        activeTab.addEventListener('oTransitionEnd', transitionend)
        activeTab.addEventListener('mozTransitionEnd', transitionend)
    } else {
        aAfficher.classList.add('active')
        activeTab.classList.remove('active')
    }
    // On ajoute la class fade sur l'élément actif
    // A la fin de l'animation
    //     On retire la class fade et active
    //     On ajoute la class active et fade à l'élément à afficher
    //     ON ajoute la class in
}

let tabs = document.querySelectorAll('.tabs a')
for (var i = 0; i < tabs.length; i++) {
    tabs[i].addEventListener('click', function (e) {
        afficherOnglet(this)
    })
}

/*
JE RECUPERE le hash
AJOUTER LA CLASS active sur le lien href="hash"
RETIRER LA CLASS active sur les autres onglets
AFFICHER / Masquer les contenus
*/
var hashChange = function (e) {
    var hash = window.location.hash
    var a = document.querySelector('a[href="' + hash + '"]')
    if (a !== null && !a.classList.contains('active')) {
        afficherOnglet(a, e !== undefined)
    }
}

window.addEventListener('hashchange', hashChange)
hashChange()
