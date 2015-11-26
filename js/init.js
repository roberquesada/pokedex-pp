(function(){
  "use strict";

  if (window.PokemonApp === undefined) {
    window.PokemonApp = {};
  }

  $(document).on("ready", function(){
    var pokemon = new PokemonApp();
    pokemon.init();
  });


})();
