<template>
  <div>123</div>
</template>

<script>
import { mapState, mapActions, mapMutations, mapGetters } from 'vuex';
export default {
  data() {
    return {

    }
  },
  computed: {
    ...mapGetters({
      formConfig: 'formConfig'
    })
  },
  methods: {
    ...mapMutations({
      setFormId: 'FORMID_MUTATION'
    }),
    ...mapActions(['getFormConfigAndSessiondata'])
  },
  created() {
    this.setFormId('1d5a7680-06c8-411e-ac72-35cc5d4ab9a3');
    this.getFormConfigAndSessiondata().then(res => {
      console.log(this.formConfig);
    })
  }
}
</script>

<style>

</style>
