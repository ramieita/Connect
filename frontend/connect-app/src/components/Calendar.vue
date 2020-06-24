<template>
  <div class="calendar">
    <b-row>
      <b-col md="auto">
        <b-calendar @context="onContext" locale="en-US"></b-calendar>
      </b-col>
    </b-row>
  </div>
</template> 

<script>
export default {
  data() {
    return {
      context: null
    };
  },
  methods: {
    onContext(ctx) {
      this.context = ctx;
    }
  }
};
</script>

<style scoped>
.calendar{
    margin-left: 30%;
}
</style>