import { user } from './user';
import { file } from './file';
import { post } from './post';
import { subject } from './subject';
import { grade } from './grade';
import { plan } from './plan';
import { language } from './language';
import { education } from './education';
import { experience } from './experience';
import { certificate } from './certificate';
import { timing } from './timing';
import { rate } from './rate';
import { rating } from './rating';
import { order } from './order';
import { hiw } from './hiw';
import { faq } from './faq';
import { blog } from './blog';
import { announcement } from './announcement';
import { subjectCategory } from './subjectCategory';
import { blogCategory } from './blogCategory';
import { connection } from './connection';
import { chat } from './chat';
import { proposal } from './proposal';
import { payment } from './payment';
import { dispute } from './dispute';
import { bill } from './bill';
import { follow } from './follow';
import { support } from './support';
import { payout } from './payout';

export const apiData = {
    ...user,
    ...file,
    ...post,
    ...subject,
    ...grade,
    ...plan,
    ...language,
    ...education,
    ...experience,
    ...certificate,
    ...timing,
    ...rate,
    ...rating,
    ...order,
    ...hiw,
    ...faq,
    ...announcement,
    ...subjectCategory,
    ...blogCategory,
    ...connection,
    ...chat,
    ...blog,
    ...proposal,
    ...payment,
    ...dispute,
    ...bill,
    ...follow,
    ...support,
    ...payout
};
