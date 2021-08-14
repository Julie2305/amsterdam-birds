<template>
  <div>
  {{ birds }}
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'Birds',
  computed: {
    ...mapState(['birds']),
  },
  mounted () {
    this.fetchBirds()
  },
  methods: {
    ...mapActions(['fetchBirds']),
  },
}
</script>
