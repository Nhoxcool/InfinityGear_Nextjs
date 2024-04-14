import nodemailer from "nodemailer";

type profile = { name: string; email: string };

interface EmailOptions {
  profile: profile;
  subject: "verification" | "forget-password" | "password-changed";
  linkUrl?: string;
}

const generateMailTransporter = () => {
  const transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASSWORD,
    },
  });

  return transport;
};

const sendEmailVerificationLink = (profile: profile, linkUrl: string) => {
  const transport = generateMailTransporter();

  transport.sendMail({
    from: "verification@infinitygear.com",
    to: profile.email,
    html: `<h1>Please verify your email by clicking on <a href="${linkUrl}">This link</a>`,
  });
};

const sendForgetPasswordLink = (profile: profile, linkUrl: string) => {
  const transport = generateMailTransporter();

  transport.sendMail({
    from: "verification@infinitygear.com",
    to: profile.email,
    html: `<h1>Click on this link to reset your password <a href="${linkUrl}">This link</a></h1>`,
  });
};

const sendUpdatePasswordComfirmation = (profile: profile) => {
  const transport = generateMailTransporter();

  transport.sendMail({
    from: "verification@infinitygear.com",
    to: profile.email,
    html: `<h1>We changed your password <a href="${process.env.SIGN_IN_URL}"></a></h1>`,
  });
};

export const sendEmail = (options: EmailOptions) => {
  const { profile, subject, linkUrl } = options;

  switch (subject) {
    case "verification":
      return sendEmailVerificationLink(profile, linkUrl!);
    case "forget-password":
      return sendForgetPasswordLink(profile, linkUrl!);
    case "password-changed":
      return sendUpdatePasswordComfirmation(profile);
  }
};
