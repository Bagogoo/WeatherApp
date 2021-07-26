<template>
    <div>
      <div class="warning">{{this.data.error}}</div>
    <b-form v-if="!data.submitted">
      <b-form-group
        id="input-group-1"
        label="Email:"
        label-for="input-1"
      >
        <b-form-input
          id="input-1"
          v-model="data.email"
          type="email"
          placeholder="Wpisz email"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group  id="input-group-2" label="Hasło:" label-for="input-2">
        <b-form-input
          id="input-2"
          type="password"
          v-model="data.password"
          placeholder="Wpisz hasło"
          required
        ></b-form-input>
      </b-form-group>


      <b-button type="submit" @click="login(data.email, data.password)" variant="primary">Zaloguj</b-button>
    
    </b-form>
    </div>
</template>

<script src="./Login.ts" />
<style scoped>
.warning{
  color:red;
  size: 50px;
}
</style>