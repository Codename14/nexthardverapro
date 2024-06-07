type Messages = typeof import('./messages/hu.json');
type EnMessages = typeof import('./messages/en.json');

declare interface IntlMessages extends Messages, EnMessages {}

// ide hozzá kell adni a nyelvet az auto kitöltéshez
