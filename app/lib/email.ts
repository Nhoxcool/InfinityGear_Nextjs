import nodemailer from 'nodemailer';

type profile = { name: string; email: string };

interface EmailOptions {
  profile: profile;
  subject: 'verification' | 'forget-password' | 'password-changed';
  linkUrl?: string;
}

const generateMailTransporter = () => {
  const transport = nodemailer.createTransport({
    host: 'sandbox.smtp.mailtrap.io',
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
    from: 'verification@infinitygear.com',
    to: profile.email,
    html: `  <body align="center" style="background-color:azure;">
    <img src="" alt="logo">
      <h1 class="title">Comfirm your email address </h1>
      <p align="left" style="font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px;">Tap the button below to confirm your email address. If you didn't create an account with <a href="/">Infinity Gear</a> , you can safely delete this email. 
      </p>
      <div align="center" style="font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px;">
              <a  href="${linkUrl}" target="_blank" style="  background-color:MidnightBlue;display: inline-block; padding: 16px 36px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; color: #ffffff; text-decoration: none; border-radius: 6px; margin-top-bottom: 10px">Verify your email</a>
      </div>
      
      <div align="left" style="font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px;">
      <p >
        If that doesn't work, copy and paste the following link in your browser: 
      </p>
      
      <a href=" ${linkUrl}">
        <p >
        ${linkUrl}
        </p>
      </a>
      <p>
        Cheer,
      </p>
      <p>
        Infinity Gear
      </p>
      </div>
      
  </body>
`,
  });
};

const sendForgetPasswordLink = (profile: profile, linkUrl: string) => {
  const transport = generateMailTransporter();

  transport.sendMail({
    from: 'verification@infinitygear.com',
    to: profile.email,
    html: `<h1>Click on this link to reset your password <a href="${linkUrl}">This link</a></h1>`,
  });
};

const sendUpdatePasswordComfirmation = (profile: profile) => {
  const transport = generateMailTransporter();

  transport.sendMail({
    from: 'verification@infinitygear.com',
    to: profile.email,
    html: `<h1>We changed your password <a href="${process.env.SIGN_IN_URL}"></a></h1>`,
  });
};

export const sendEmail = (options: EmailOptions) => {
  const { profile, subject, linkUrl } = options;

  switch (subject) {
    case 'verification':
      return sendEmailVerificationLink(profile, linkUrl!);
    case 'forget-password':
      return sendForgetPasswordLink(profile, linkUrl!);
    case 'password-changed':
      return sendUpdatePasswordComfirmation(profile);
  }
};
