<template>
  <div class="app__wrapper">
    <div class="app__double__column app__property__details">
      <div>
        <h1>{{ home.title }}</h1>
        <div class="app__flex">
          <div class="app__address">
            <span>{{ home.location.address }} {{ home.location.city }} {{ home.location.state }} {{ home.location.country }}</span>
          </div>
          <div class="app__rating">
            {{ home.reviewValue }} <span>({{ home.reviewCount }})</span>
          </div>
        </div>
        <div class="app__property__defails__footer">
          <span>
            {{ $helpers.pluralize(home.guests, 'guest') }} &middot;
            {{ $helpers.pluralize(home.bedrooms, 'room') }} &middot;
            {{ $helpers.pluralize(home.beds, 'bed') }} &middot;
            {{ $helpers.pluralize(home.bathrooms, 'bath') }}
          </span>
        </div>
      </div>
      <div>
        <div class="app__price">
          ${{ home.pricePerNight }} <span>/ night</span>
        </div>
        <div class="app__search">
          <input
            type="text"
            class="datepicker"
            placeholder="Check in"
          >
          <input
            type="text"
            class="datepicker"
            placeholder="Check out"
          >
        </div>
        <button class="app__big__button">
          Request to book!
        </button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      home: {
        type: Object,
        required: true
      }
    }
  }
</script>
