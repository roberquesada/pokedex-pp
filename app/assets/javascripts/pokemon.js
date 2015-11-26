// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
(function() {
  "use strict";
  PokemonApp.Pokemon = function(pokemonUri) {
    this.id = PokemonApp.Pokemon.idFromUri(pokemonUri);
  };

  PokemonApp.Pokemon.prototype.render = function() {
    console.log('Rendering pokemon: # ' + this.id);

    var _this = this;

    $.ajax({
      url: '/api/pokemon/' + this.id,
      success: function(response) {
        self.info = response;
        var types = self.info.types;
        $(document).find('.js-pkmn-type-item').remove();
        console.log(self.info);
        $('.js-pokemon-modal').modal('show');
        $('.js-pkmn-name').text(self.info.name);
        $('.js-pkmn-number').text(self.info.pkdx_id);
        $('.js-pkmn-height').text(self.info.height);
        $('.js-pkmn-weight').text(self.info.weight);
        $('.js-pkmn-hp').text(self.info.hp);
        $('.js-pkmn-attack').text(self.info.attack);
        $('.js-pkmn-defense').text(self.info.defense);
        $('.js-pkmn-sp-attack').text(self.info.sp_atk);
        $('.js-pkmn-sp-defense').text(self.info.sp_def);
        $('.js-pkmn-speed').text(self.info.speed);

        console.log(PokemonApp.Pokemon.getLastUriDescription(self.info.descriptions));

        types.forEach(function(type) {
          $('.js-pkmn-type').after('<dd class="js-pkmn-type-item">' + type.name + '</dd>');
        });

    var img_id = parseInt(_this.id) + 1;

    $.ajax({
      url: '/api/sprite/' + img_id,
      beforeSend: function() {
        $(document).find('.js-pkmn-img').remove();
      },
      success: function(response) {
        self.info = response;
        console.log(self.info);
        $('.modal-body').prepend(
          '<img src="http://pokeapi.co' + self.info.image + '" alt="" class="js-pkmn-img">'
        );
        $('.js-pkmn-img').text(self.info.speed);
      }
    });


      }
    });
  };

  PokemonApp.Pokemon.getLastUriDescription = function(descriptions) {
    var totalEvolution = 0;
    var descriptionUriArr = [];

    for (var description in descriptions){
      var obj = descriptions[description];
      var segmentsName = obj.name.split('_');
      var lastElement = segmentsName.length - 1;
      var currentEvolution = parseInt(segmentsName[lastElement]);
        if (currentEvolution > totalEvolution) {
          totalEvolution++;
          descriptionUriArr = [];
          descriptionUriArr.push(obj.resource_uri);
        } else if (currentEvolution === totalEvolution) {
          descriptionUriArr.push(obj.resource_uri);
        }
    }
    return descriptionUriArr;
  };

  PokemonApp.Pokemon.idFromUri = function(pokemonUri) {
    var uriSegments = pokemonUri.split('/');
    var secondLast = uriSegments.length - 2;
    return uriSegments[secondLast];
  };

  $(document).on('ready', function() {
    $('.js-show-pokemon').on('click', function(event) {
      var $button = $(event.currentTarget);
      var pokemonUri = $button.data('pokemon-uri');
      var pokemon = new PokemonApp.Pokemon(pokemonUri);
      pokemon.render();
    });
  });

})();
