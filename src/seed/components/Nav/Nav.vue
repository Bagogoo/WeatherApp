<template>
    <div>
    <div>
    <b-nav tabs fill v-if="!this.isloggedIn()">
        <b-nav-item href="/">Home</b-nav-item>
        <b-nav-item href="/#/login">Logowanie</b-nav-item>
        <b-nav-item href="/#/register">Rejestracja</b-nav-item>
    </b-nav>
      <b-nav tabs fill v-else>
        <b-nav-item href="/">Home</b-nav-item>
         <b-nav-item @click="logout()">Wyloguj</b-nav-item>
    </b-nav>
    </div>
    </div>
</template>

<script src="./Nav.ts" />