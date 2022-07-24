<template>
  <div>
    <div class="container">
      <h1>Sign Up</h1>
      <p>Please fill in this form to create an account.</p>
      <hr />

      <div v-if="message">{{ message }}</div>
      <label for="email"><b>Email</b></label>
      <input
        type="text"
        placeholder="Enter Email"
        name="email"
        required
        maxlength="320"
        v-model="email"
      />

      <label for="name"><b>Name</b></label>
      <input
        type="text"
        placeholder="Enter Name"
        name="name"
        required
        minlength="3"
        maxlength="25"
        v-model="userName"
      />

      <label for="psw"><b>Password</b></label>
      <input
        type="password"
        placeholder="Enter Password"
        name="psw"
        maxlength="16"
        required
        v-model="password"
      />

      <label for="psw-repeat"><b>Repeat Password</b></label>
      <input
        type="password"
        placeholder="Repeat Password"
        name="psw-repeat"
        required
        maxlength="16"
        v-model="repeatPassword"
      />

      <label>
        <input
          type="checkbox"
          checked="checked"
          name="remember"
          style="margin-bottom: 15px"
        />
        Remember me
      </label>

      <p>
        By creating an account you agree to our
        <a href="#" style="color: dodgerblue">Terms & Privacy</a>.
      </p>

      <div class="clearfix">
        <button class="cancelbtn" @click="goToRoutName()">Cancel</button>
        <button class="signupbtn" @click="submit()">Sign Up</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "SignUp",
  data() {
    return {
      userName: "",
      email: "",
      password: "",
      message: "",
      repeatPassword: "",
    };
  },

  methods: {
    ...mapActions("auth", ["signup", "logout"]),
    goToRoutName() {
      this.$router.push({ name: "home" });
    },

    async submit() {
      const valName = await this.validName();
      let validPass = await this.validPassword();
      const valEmail = await this.validEmail();
      if (validPass && valName && valEmail) {
        try {
          const user = {
            name: this.userName,
            email: this.email,
            password: this.password,
          };
          const result = await this.signup(user);

          if (result === true) {
            this.message = "";
            this.$router.push({
              path: "/login",
              query: { signedup: "true" },
            });
          } else {
            this.message = result; //'SignUp error!';
          }
        } catch (err) {
          this.message = err.message;
        }
      }
    },
    validPassword() {
      if (this.password !== this.repeatPassword) {
        this.message = "Помилка пароля";
        alert("Помилка пароля");
        return false;
      } else if (this.password.length > 16) {
        this.message = "Довжна пароля повинна бути не більше 16 символів";
        alert("Довжна пароля повинна бути не більше 16 символів");
        return false;
      } else return true;
    },

    validName() {
      if (this.userName.length < 3 || this.userName.length > 25) {
        this.message = "Імя користувача повинно містити від 3 до 25 символів";
        alert("Імя користувача повинно містити від 3 до 25 символів");
        return false;
      } else return true;
    },

    validEmail() {
      const pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

      if (!this.email.match(pattern)) {
        this.message = "Email введено не вірно";
        alert("Email введено не вірно");
        return false;
      } else return true;
    },
  },

  created() {
    this.logout();
  },
};
</script>
<style lang="scss" scoped>
* {
  box-sizing: border-box;
} /* Full-width input fields */
input[type="text"],
input[type="password"] {
  width: 100%;
  padding: 15px;
  margin: 5px 0 22px 0;
  display: inline-block;
  border: none;
  background: #f1f1f1;
}
input[type="text"]:focus,
input[type="password"]:focus {
  background-color: #ddd;
  outline: none;
}
hr {
  border: 1px solid #f1f1f1;
  margin-bottom: 25px;
} /* Set a
style for all buttons */
button {
  background-color: #04aa6d;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  cursor: pointer;
  width: 100%;
  opacity: 0.9;
}
button:hover {
  opacity: 1;
} /* Extra styles for the cancel
button */
.cancelbtn {
  padding: 14px 20px;
  background-color: #f44336;
} /* Float
cancel and signup buttons and add an equal width */
.cancelbtn,
.signupbtn {
  float: left;
  width: 50%;
} /* Add padding to container elements */
.container {
  padding: 16px;
} /* Clear floats */
.clearfix::after {
  content: "";
  clear: both;
  display: table;
} /* Change styles for cancel button and signup button on extra
small screens */
@media screen and (max-width: 300px) {
  .cancelbtn,
  .signupbtn {
    width: 100%;
  }
}
</style>
