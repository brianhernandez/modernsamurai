<template>
  <div>
    <header class="index-header">
      <div>
        <h1 class="title index-header__title">
          Modern Samurai
        </h1>
        <h2 class="subtitle index-header__subtitle">
          Life Optimization, Simplified
        </h2>
        <div class="links index-header__links">
          <b-button
            to="/login"
            size="lg"
            class="index-header__button">Login</b-button>
          <b-button
            to="/signup"
            size="lg"
            class="index-header__button">Signup</b-button>
        </div>
        <p class="lead index-header__lead">A simple web app for tracking and exposing you to self-improvement strategies.</p>
      </div>
    </header>
    <section class="index-content">
      <b-container class="index-content__container">
        <b-row>
          <b-col>
            <h3>What Is Modern Samurai?</h3>
            <p>It's a simple web application that helps you record and keep track of the different routines and practices in your life.  It also maintains a curated list of recommended self-improvment tactics for you to adopt.</p>
            <h3>Routines Or Practices?</h3>
            <p>If you are a person interested in self-improvment or personal development, you've probably come across many kinds of exercises, daily practices, routines etc. that you are advised to do to improve some aspect of your life.  If you read enough books, listen to enough podcasts, and take enough notes, you eventually might feel overwhelemed by all the little practices you are doing to improve your life.</p>
            <h3>How Does The Site Track These Routines/Practices?</h3>
            <p>Right now, the different practices can be categorized into 4 possible perspectives of reality.  Usually a routine or practice can be put into one of these categories.</p>
            <h3>Whoa, That Got Deep Real Quick.  4 Possible Perspectives Of Reality?</h3>
            <p>Yes.  The reality you live in can be viewed in at least 4 different perspectives.  Don't worry, its not complicated.  This is just a way to help expose you to other routines, practices, strategies, hacks etc. etc. that you may not be aware of that can help you improve your life.</p>
            <h3>Why?</h3>
            <p>Hi, my name is Brian.  I'm making this app because I want to help people improve their lives and be the best version of themselves that they can be.</p>
            <p class="index-content__emojis">😄✌🏼</p>
          </b-col>
        </b-row>
      </b-container>
    </section>
    <div/>
</div></template>

<script>
export default {
  components: {}
}
</script>

<style scoped lang="scss">
.index-header {
  background: grey url('~assets/img/zen_garden.jpg') no-repeat fixed;
  background-size: cover;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: white;

  .index-header__subtitle {
    font-style: italic;
  }

  .index-header__title {
    margin-top: 70px;
  }

  .index-header__links {
    margin-top: 20px;
    margin-bottom: 20px;

    .index-header__button:first-of-type {
      margin-right: 10px;
    }
    .index-header__button:last-of-type {
      margin-left: 10px;
    }

    .index-header__button {
      background-color: transparent;
      border: 1px solid white;
      border-radius: 0;
      transition: color 0.15s, background-color 0.15s;

      &:hover {
        background-color: white;
        color: $text-color;
      }
    }
  }
}

.index-content {
  padding: 60px 0;

  .index-content__container {
    max-width: 600px;

    h3 {
      margin: 40px 0;
    }

    .index-content__emojis {
      text-align: center;
      font-size: 2rem;
    }
  }
}
</style>
