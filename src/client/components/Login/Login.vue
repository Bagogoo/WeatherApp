<template>
    <div class="page">
      <div class="warning">{{this.data.error}}</div>
     <b-col  cols="12" offset="0" sm="6" offset-sm="3">
    <b-form class="form" v-if="!data.submitted">
      <b-form-group
        id="input-group-1"
        label-for="input-1"
      >
        <b-form-input
        class="input"
          id="input-1"
          v-model="data.email"
          type="email"
          placeholder="Wpisz email"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group  id="input-group-2" label-for="input-2">
        <b-form-input
        class="input"
          id="input-2"
          type="password"
          v-model="data.password"
          placeholder="Wpisz hasło"
          required
        ></b-form-input>
      </b-form-group>

<div class="text-center">
      <b-button class="btn-register" type="submit" @click="login(data.email, data.password)" variant="primary">Zaloguj</b-button>
</div>
    </b-form>
     </b-col>
    </div>
</template>

<script src="./Login.ts" />
<style scoped>
b-form-group{
margin: 10px;
}
.input{
  width: auto;
  margin: 10px auto 10px;
}
.page{
  background-color: deepskyblue;
}
.form{
  padding: 50px;
  background-color: deepskyblue;
}
.btn-register{
    display: inline-block;
    padding: 5px;
    color:black;
    font-size: 15px;
    appearance: none;
    border: none;
    outline: none;
    background-color: rgba(255,255,255,0.75);
    border-radius: 5px;
    margin: 10px;
  }
   .btn-register  :hover{
    display: inline-block;
    padding: 5px;
    margin:20px;
    color:white;
    font-size: 15px;
    appearance: none;
    border: none;
    outline: none;
    background-color: rgba(43, 36, 36, 0.75);
    border-radius: 5px;
  }
</style>