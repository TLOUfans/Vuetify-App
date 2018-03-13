<template>
  <div>123</div>
</template>

<script>
import { mapState, mapActions, mapMutations, mapGetters } from 'vuex';
export default {
  data() {
    return {
      list: []
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
    ...mapActions(['getFormConfig'])
  },
  created() {
    this.getFormConfig().then(res => {
      console.log(this.formConfig);
    });
  }
}
</script>

<style>

</style>
