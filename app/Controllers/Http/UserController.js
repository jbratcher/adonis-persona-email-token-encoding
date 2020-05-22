"use strict";

const Event = use("Event");
const Persona = use("Persona");

class UserController {
  async index({ request, response, view }) {
    return view.render("register");
  }

  async register({ request, auth, response }) {
    const payload = request.only([
      "email",
      "password",
      "password_confirmation",
    ]);

    console.log(payload);

    const user = await Persona.register(payload);

    await auth.login(user);
  }

  async verifyEmail({ params, session, response }) {
    const user = await Persona.verifyEmail(params.token);

    session.flash({ message: "Email verified" });
  }
}

module.exports = UserController;
