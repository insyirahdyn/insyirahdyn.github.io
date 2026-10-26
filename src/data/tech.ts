// Logos for the technologies shown in tags. Brand logos come from the devicon package.
// "mono" logos are one colour, so they are drawn in the text colour and stay visible in dark mode.
// Anything without a logo gets a simple line icon from components/Icon.astro instead.
import react from 'devicon/icons/react/react-original.svg?url';
import nodejs from 'devicon/icons/nodejs/nodejs-original.svg?url';
import express from 'devicon/icons/express/express-original.svg?url';
import mongodb from 'devicon/icons/mongodb/mongodb-original.svg?url';
import socketio from 'devicon/icons/socketio/socketio-original.svg?url';
import vite from 'devicon/icons/vitejs/vitejs-original.svg?url';
import javascript from 'devicon/icons/javascript/javascript-original.svg?url';
import python from 'devicon/icons/python/python-original.svg?url';
import php from 'devicon/icons/php/php-original.svg?url';
import mysql from 'devicon/icons/mysql/mysql-original.svg?url';
import html from 'devicon/icons/html5/html5-original.svg?url';
import git from 'devicon/icons/git/git-original.svg?url';
import vercel from 'devicon/icons/vercel/vercel-original.svg?url';
import linux from 'devicon/icons/linux/linux-plain.svg?url';

export type TechIcon = { logo: string; mono?: boolean } | { icon: string };

const icons: [RegExp, TechIcon][] = [
  [/^react/i, { logo: react }],
  [/^node/i, { logo: nodejs }],
  [/^express/i, { logo: express, mono: true }],
  [/^mongo/i, { logo: mongodb }],
  [/^socket/i, { logo: socketio, mono: true }],
  [/^vite/i, { logo: vite }],
  [/^javascript/i, { logo: javascript }],
  [/^python/i, { logo: python }],
  [/^php/i, { logo: php }],
  [/^mysql/i, { logo: mysql }],
  [/^html/i, { logo: html }],
  [/^git/i, { logo: git }],
  [/^vercel/i, { logo: vercel, mono: true }],
  [/^linux/i, { logo: linux, mono: true }],
  [/^sql$/i, { icon: 'database' }],
  [/^rest/i, { icon: 'plug' }],
  [/^data model/i, { icon: 'table' }],
  [/^jwt|^auth/i, { icon: 'key' }],
  [/^bcrypt/i, { icon: 'lock' }],
  [/^chart/i, { icon: 'chart' }],
  [/^xampp/i, { icon: 'server' }],
  [/^incident/i, { icon: 'siren' }],
  [/^nist/i, { icon: 'clipboard' }],
  [/^risk/i, { icon: 'gauge' }],
  [/^wireshark/i, { icon: 'activity' }],
];

export function techIcon(name: string): TechIcon | undefined {
  return icons.find(([re]) => re.test(name))?.[1];
}
