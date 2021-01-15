// Import Module
const cron = require('node-cron'),
    spawn = require('child_process').spawn;

// node-cron: https://www.npmjs.com/package/node-cron
// child-process: https://nodejs.org/api/child_process.html

// let task = cron.schedule('59 23 * * *', () => {
//     cosnole.log('Une minute avant minuit');
// });

let dbBackupTask = cron.schedule('* * * * *', () => {

    // La commande shell
    let backupProcess = spawn('mongodump', [
        // '--db=apiRest',
        '--uri=<linkMongoDbAtlas>',
        '--archive=./backup_project_dd-mm-yyyy',
        '--gzip'
    ]);

    // La sortie de notre commande
    backupProcess.on('exit', (code, signal) => {
        if (code)
            console.log('Processus de sauvegarde terminé avec le code ', code);
        else if (signal)
            console.error('Le processus de sauvegarde a été tué avec sigal ', signal);
        else
            console.log('Sauvegarde réussie de la base de données')
    });

});

/* Utiliser un utilitaire nommé mongodump, qui peut exporter les données de la base de données vers un système de fichiers local.*/
// Commande ci-dessous:
// mongodump --uri="mongodb+srv://suka:BakuraRyo_123@jjba.vugld.mongodb.net/jjba" --archive=./backup_jjba --gzip
// L'argument --gzip fera que le fichier de sortie sera compressé avec gzip

// Pour réstorer:
// mongorestore --gzip --archive=backup_jjba