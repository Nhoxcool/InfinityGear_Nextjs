import nodemailer from 'nodemailer';
import path from 'path';
import { generateTemplate } from '../mail/template';

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
  const message = `Hi ${profile.name}! Tap the button below to confirm your email address. If you didn't create an account with Infinity Gear, you can safely delete this email.`;

  transport.sendMail({
    from: 'verification@infinitygear.com',
    to: profile.email,
    subject: 'Vefify email',
    html: generateTemplate({
      title: 'Comfirm your email address',
      message: message,
      logo: 'cid:logo',
      banner: 'cid:verify',
      link: linkUrl,
      btnTitle: 'Verify your email',
    }),
    attachments: [
      {
        filename: 'logo.png',
        path: path.join(process.cwd(), '/app/mail/image/logo.png'),
        cid: 'logo',
      },
      {
        filename: 'verify.png',
        path: path.join(process.cwd(), '/app/mail/image/verify.png'),
        cid: 'verify',
      },
    ],
  });
};

const sendForgetPasswordLink = (profile: profile, linkUrl: string) => {
  const transport = generateMailTransporter();

  const message = `Hi ${profile.name}! Seems like you forgot your password for your Infinity Gear account. If this is true, click the button below to reset your password.`;

  transport.sendMail({
    from: 'Passwordlink@infinitygear.com',
    to: profile.email,
    subject: 'Reset password',
    html: generateTemplate({
      title: 'Reset your password',
      message: message,
      logo: 'cid:logo',
      banner: 'cid:forget',
      link: linkUrl,
      btnTitle: 'Reset your password',
    }),
    attachments: [
      {
        filename: 'logo.png',
        path: path.join(process.cwd(), '/app/mail/image/logo.png'),
        cid: 'logo',
      },
      {
        filename: 'forget.png',
        path: path.join(process.cwd(), '/app/mail/image/forget.png'),
        cid: 'forget',
      },
    ],
  });
};

const sendUpdatePasswordComfirmation = (profile: profile) => {
  const transport = generateMailTransporter();

  const message = `Hi ${profile.name}! We successfully successfully changed your password. Click the button bellow to login.`;

  transport.sendMail({
    from: 'Passwordlink@infinitygear.com',
    to: profile.email,
    subject: 'Changed password',
    html: generateTemplate({
      title: 'Successfully changed your password',
      message: message,
      logo: 'cid:logo',
      banner: 'cid:confirm',
      link: '/',
      btnTitle: 'Login now',
    }),
    attachments: [
      {
        filename: 'logo.png',
        path: path.join(process.cwd(), '/app/mail/image/logo.png'),
        cid: 'logo',
      },
      {
        filename: 'confirm.png',
        path: path.join(process.cwd(), '/app/mail/image/confirm.png'),
        cid: 'confirm',
      },
    ],
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
