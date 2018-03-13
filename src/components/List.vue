<template>
  <v-toolbar color="cyan" dark>
    <icon name="back" type="class" :style="{color: '#fff', fontSize: '1.5rem'}"></icon>
    <v-toolbar-title style="text-align:center">Inbox</v-toolbar-title>
  </v-toolbar>
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
      formConfig: 'formConfig',
      
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

<style lang="scss" scoped>

</style>
