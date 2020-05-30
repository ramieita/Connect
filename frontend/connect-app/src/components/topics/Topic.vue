<template>
  <div>
    <Navbar />
    <h1>{{ topicId | uppercase }}</h1>
    <div class="input-group">
      <div class="input-group-prepend">
        <span class="input-group-text">Create new topic</span>
      </div>
      <input type="text" aria-label="Topic name" class="form-control" placeholder="Open new topic..." />
      <b-button id="btn" type="submit" variant="success">CREATE</b-button>
    </div>
    <div>
      <table class="table table-hover">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Topic Name</th>
            <th scope="col">Date</th>
            <th scope="col">Edit</th>
          </tr>
        </thead>
        <tbody></tbody>
      </table>
    </div>
  </div>
</template>

<script>
import Navbar from "../navigation/Navbar";
export default {
  name: "Topic",
  props: {
    topicId: String
  },
  components: {
    Navbar
  },
  methods: {
  },
  filters: {
    uppercase: function(v) {
      return v.toUpperCase();
    }
  }
};
</script>

<style scoped>
h1 {
  margin: 1%;
}
.table, .input-group {
  width: 70%;
  margin: 2% auto;
}
</style>