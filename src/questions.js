const q = (id, source, prompt, options, answer, explanation) => ({
  id,
  source,
  prompt,
  options,
  answer,
  explanation
});

export const questions = [
  q(
    1,
    "01 - Networking e SSH.md",
    "Quale insieme di informazioni e' strettamente necessario per mettere in rete correttamente un server GNU/Linux in una rete IPv4 con accesso esterno?",
    [
      "Indirizzo IP, netmask, default gateway e almeno un server DNS",
      "Hostname, MAC address, default gateway e versione del kernel",
      "Solo indirizzo IP e server DNS, perche' la netmask viene dedotta automaticamente",
      "Indirizzo IP, inode liberi, gateway e percorso di `/etc/hosts`"
    ],
    0,
    "Nel file sulle domande di rete compaiono IP, subnet mask, gateway e DNS come elementi necessari."
  ),
  q(
    2,
    "01 - Networking e SSH.md",
    "Quale coppia di comandi imposta rispettivamente un indirizzo IP e il default gateway con gli strumenti `ip`?",
    [
      "`ip route add <IP>/<MASK> dev eth0` e `ip address add default via <GW>`",
      "`ip address add <IP>/<MASK> dev eth0` e `ip route add default via <GW> dev eth0`",
      "`ifconfig eth0 <IP>/<MASK>` e `route add gw default <GW>`",
      "`ip link set <IP>/<MASK> dev eth0` e `ip address add default <GW>`"
    ],
    1,
    "Le note della cartella Domande riportano la sintassi con `ip address add` per l'IP e `ip route add default via` per il gateway."
  ),
  q(
    3,
    "01 - Networking e SSH.md",
    "Se un indirizzo configurato con il comando `ip` scompare dopo il riavvio, qual e' il modo corretto per renderlo persistente nell'ambiente trattato?",
    [
      "Rieseguire `ip address add` da `cron.daily`",
      "Scrivere la configurazione in un file YAML sotto `/etc/netplan/` e poi applicarla con netplan",
      "Aggiungere l'indirizzo a `/etc/hosts`",
      "Usare `ss -punta` per fissare la configurazione nel kernel"
    ],
    1,
    "Nel materiale locale la persistenza viene ricondotta a netplan e ai file YAML sotto `/etc/netplan/`."
  ),
  q(
    4,
    "01 - Networking e SSH.md",
    "Con `ping 1.1.1.1` compare `Network is unreachable`. Quale informazione manca piu' probabilmente nella configurazione del server?",
    [
      "Il server DNS",
      "La route statica verso localhost",
      "Il default gateway",
      "La chiave host di SSH"
    ],
    2,
    "L'errore compare gia' raggiungendo un IP numerico, quindi il problema non e' la risoluzione DNS ma l'instradamento verso l'esterno."
  ),
  q(
    5,
    "01 - Networking e SSH.md",
    "Eseguendo `curl https://google.com` compare `Could not resolve host`. Quale informazione risulta mancante?",
    [
      "Il MAC address dell'interfaccia",
      "Il server DNS",
      "La netmask",
      "La route di loopback"
    ],
    1,
    "Se il nome host non viene risolto, la connettivita' puo' anche esserci, ma manca la configurazione DNS."
  ),
  q(
    6,
    "01 - Networking e SSH.md",
    "Quale pipeline e' la piu' adatta per estrarre gli endpoint remoti delle connessioni TCP gia' stabilite dal sistema?",
    [
      "`ss -punta | grep LISTEN | awk '{ print $5 }'`",
      "`ss -punta | grep ESTAB | awk '{ print $6 }'`",
      "`ss -punta | grep udp | awk '{ print $5 }'`",
      "`ip route | grep ESTAB | awk '{ print $6 }'`"
    ],
    1,
    "Nell'output di `ss -punta`, per le connessioni `ESTAB`, il peer remoto compare nella sesta colonna."
  ),
  q(
    7,
    "01 - Networking e SSH.md",
    "Quale pipeline e' la piu' corretta per elencare gli indirizzi locali su cui processi locali sono in ascolto?",
    [
      "`ss -punta | grep LISTEN | awk '{ print $5 }'`",
      "`ss -punta | grep ESTAB | awk '{ print $6 }'`",
      "`ps aux | grep LISTEN | awk '{ print $5 }'`",
      "`tcpdump -i eth0 | awk '{ print $5 }'`"
    ],
    0,
    "Per i socket in ascolto la colonna locale di `ss` e' quella utile, filtrando lo stato `LISTEN`."
  ),
  q(
    8,
    "01 - Networking e SSH.md",
    "Qual e' la differenza sostanziale tra un processo in ascolto su `127.0.0.1` e uno in ascolto su `0.0.0.0`?",
    [
      "Nel primo caso il servizio e' raggiungibile solo localmente, nel secondo su tutte le interfacce attive",
      "Nel primo caso usa solo UDP, nel secondo solo TCP",
      "Nel primo caso richiede root, nel secondo no",
      "Non c'e' differenza: e' solo una rappresentazione diversa dello stesso bind"
    ],
    0,
    "`127.0.0.1` limita il bind alla loopback, mentre `0.0.0.0` espone il servizio su tutte le interfacce disponibili."
  ),
  q(
    9,
    "01 - Networking e SSH.md",
    "Quale combinazione di comandi realizza correttamente un trasferimento file elementare con `nc`, con un host in ascolto e uno che invia il contenuto?",
    [
      "Ricevente: `nc -l -p 9000 > file.txt` | Mittente: `nc host 9000 < file.txt`",
      "Ricevente: `nc host 9000 > file.txt` | Mittente: `nc -l -p 9000 < file.txt`",
      "Ricevente: `scp -l 9000 > file.txt` | Mittente: `nc host:9000 file.txt`",
      "Ricevente: `netplan try > file.txt` | Mittente: `nc host 9000 | cat file.txt`"
    ],
    0,
    "Il listener riceve sul proprio stdout, che viene rediretto su file; il sender reindirizza il file sullo stdin di `nc`."
  ),
  q(
    10,
    "01 - Networking e SSH.md",
    "Quale affermazione distingue correttamente `netplan apply` da `netplan try`?",
    [
      "`apply` verifica solo la sintassi, `try` applica in modo definitivo",
      "`apply` rende subito attive le modifiche, `try` le prova temporaneamente con possibile rollback",
      "`apply` vale solo per DHCP, `try` solo per configurazioni statiche",
      "`apply` scrive in `/etc/hosts`, `try` in `/etc/resolv.conf`"
    ],
    1,
    "Nelle note `netplan try` e' usato per il test temporaneo, mentre `apply` applica la configurazione."
  ),
  q(
    11,
    "01 - Networking e SSH.md",
    "In quale formato va normalmente specificata la configurazione passata a netplan?",
    [
      "In file INI sotto `/etc/network/`",
      "In file JSON sotto `/etc/systemd/network/`",
      "In file YAML sotto `/etc/netplan/`",
      "In file XML sotto `/var/lib/netplan/`"
    ],
    2,
    "Il materiale locale richiama esplicitamente i file `*.yaml` dentro `/etc/netplan/`."
  ),
  q(
    12,
    "02 - MySQL.md",
    "Su quale porta si mette in ascolto di default il server MySQL?",
    [
      "5432/TCP",
      "2049/TCP",
      "3306/TCP",
      "6379/TCP"
    ],
    2,
    "La porta standard di MySQL nei tuoi appunti e nelle domande e' 3306/TCP."
  ),
  q(
    13,
    "02 - MySQL.md",
    "Quale query crea correttamente un nuovo utente locale in MySQL?",
    [
      "`ADD USER 'user' IDENTIFIED BY 'password';`",
      "`CREATE USER 'user'@'localhost' IDENTIFIED BY 'password';`",
      "`NEW USER 'user' ON 'localhost' WITH 'password';`",
      "`INSERT USER 'user'@'localhost' IDENTIFIED BY 'password';`"
    ],
    1,
    "La sintassi corretta usa `CREATE USER ... IDENTIFIED BY ...`."
  ),
  q(
    14,
    "02 - MySQL.md",
    "Quale comando SQL mostra l'elenco dei database disponibili sul server?",
    [
      "`LIST DATABASES;`",
      "`SHOW DATABASES;`",
      "`DESCRIBE DATABASES;`",
      "`SELECT DATABASES();`"
    ],
    1,
    "`SHOW DATABASES;` e' il comando standard per elencare i database."
  ),
  q(
    15,
    "02 - MySQL.md",
    "Dopo avere selezionato un database con `USE nome_db;`, quale comando mostra le tabelle presenti?",
    [
      "`SHOW TABLES;`",
      "`SHOW COLUMNS;`",
      "`DESCRIBE TABLES;`",
      "`LIST TABLES;`"
    ],
    0,
    "La domanda della cartella richiede proprio l'elenco delle tabelle di un database selezionato."
  ),
  q(
    16,
    "02 - MySQL.md",
    "Quale istruzione elenca le colonne di una tabella MySQL?",
    [
      "`SHOW COLUMNS FROM nome_tabella;`",
      "`SHOW TABLE nome_tabella;`",
      "`LIST FIELDS nome_tabella;`",
      "`DESCRIBE DATABASE nome_tabella;`"
    ],
    0,
    "La forma riportata nei tuoi file usa `SHOW COLUMNS FROM ...`."
  ),
  q(
    17,
    "02 - MySQL.md",
    "Quale sequenza rappresenta correttamente le operazioni CRUD in MySQL?",
    [
      "`CREATE`, `WRITE`, `USE`, `DROP`",
      "`INSERT`, `UPDATE`, `SELECT`, `DELETE`",
      "`NEW`, `ALTER`, `READ`, `REMOVE`",
      "`ADD`, `SET`, `GET`, `ERASE`"
    ],
    1,
    "Nel file MySQL le quattro operazioni sono ricondotte ai comandi `INSERT`, `UPDATE`, `SELECT`, `DELETE`."
  ),
  q(
    18,
    "02 - MySQL.md",
    "A cosa serve la clausola `WHERE` nel contesto delle query MySQL trattate?",
    [
      "A specificare una condizione di filtro applicabile almeno a `SELECT`, `UPDATE` e `DELETE`",
      "A indicare il database su cui eseguire il dump",
      "A forzare l'uso di indici B-tree",
      "A convertire una query di modifica in sola lettura"
    ],
    0,
    "`WHERE` serve a limitare l'insieme di righe coinvolte da diverse query."
  ),
  q(
    19,
    "02 - MySQL.md",
    "Quale comando estrae un dump di tutti i database presenti nel server MySQL?",
    [
      "`mysqldump --all-databases -u root -p > dump.sql`",
      "`mysql --dump-all -u root -p > dump.sql`",
      "`mysqldump -A -o root -p dump.sql`",
      "`mysqladmin backup --all-databases > dump.sql`"
    ],
    0,
    "Nella cartella Domande viene usata la variante `mysqldump --all-databases`."
  ),
  q(
    20,
    "02 - MySQL.md",
    "Per quale motivo, nel materiale, si preferisce un dump logico a una copia diretta dei file usati da MySQL?",
    [
      "Perche' i file raw non preservano mai i permessi UNIX",
      "Perche' la copia diretta puo' essere incoerente se il server e' attivo",
      "Perche' MySQL salva sempre i dati cifrati in RAM e mai su disco",
      "Perche' il dump e' l'unico metodo che mantiene il numero di inode"
    ],
    1,
    "Le note insistono sul rischio di inconsistenza copiando i file del database a server acceso."
  ),
  q(
    21,
    "02 - MySQL.md",
    "Quale strategia riduce di piu' il rischio di eseguire `UPDATE` o `DELETE` su tutte le righe per errore?",
    [
      "Usare sempre `SHOW TABLES` prima della query",
      "Eseguire la modifica in transazione, verificare il filtro e confermare solo con `COMMIT`",
      "Lanciare prima `mysqldump` e poi evitare `WHERE`",
      "Usare solo utenti `root` per avere messaggi di errore piu' precisi"
    ],
    1,
    "Nel file MySQL viene suggerito di usare transazioni e verifica prima del `COMMIT`."
  ),
  q(
    22,
    "03 - Gestione Software.md",
    "Che cosa fa `apt-get update` secondo il file `Gestione Software`?",
    [
      "Installa tutti gli aggiornamenti disponibili",
      "Aggiorna il database delle fonti dei pacchetti",
      "Pulisce la cache locale dei `.deb`",
      "Rimuove i pacchetti obsoleti"
    ],
    1,
    "Nel file compare esplicitamente come aggiornamento del database delle fonti."
  ),
  q(
    23,
    "03 - Gestione Software.md",
    "Qual e' l'effetto di `apt-get upgrade` nel materiale fornito?",
    [
      "Installa un singolo pacchetto da repository locale",
      "Installa tutti gli aggiornamenti disponibili",
      "Blocca i pacchetti all'ultima versione funzionante",
      "Elimina le configurazioni non usate"
    ],
    1,
    "Il file riassuntivo lo associa all'installazione degli aggiornamenti."
  ),
  q(
    24,
    "03 - Gestione Software.md",
    "Quale comando installa un determinato pacchetto via APT?",
    [
      "`apt-get add <pkg>`",
      "`apt-get install <pkg>`",
      "`apt-cache install <pkg>`",
      "`dpkg -l <pkg>`"
    ],
    1,
    "La scheda di gestione software riporta la sintassi `apt-get install <pkg>`."
  ),
  q(
    25,
    "03 - Gestione Software.md",
    "Quale comando rimuove un pacchetto installato lasciandone la configurazione?",
    [
      "`apt-get purge <pkg>`",
      "`apt-get remove <pkg>`",
      "`dpkg -P <pkg>`",
      "`apt-mark unhold <pkg>`"
    ],
    1,
    "Nel file `remove` e `purge` sono distinti proprio per la gestione della configurazione."
  ),
  q(
    26,
    "03 - Gestione Software.md",
    "Quale comando disinstalla un pacchetto e anche le sue configurazioni?",
    [
      "`apt-get remove <pkg>`",
      "`apt-get purge <pkg>`",
      "`apt-cache policy <pkg>`",
      "`dpkg -l <pkg>`"
    ],
    1,
    "Il riassunto della cartella usa `purge` per pacchetto piu' configurazioni."
  ),
  q(
    27,
    "03 - Gestione Software.md",
    "Quale comando viene presentato come aggiornamento ancora piu' esteso dell'intero sistema?",
    [
      "`apt-get dist-upgrade`",
      "`apt-get clean`",
      "`apt-cache search`",
      "`apt-mark hold`"
    ],
    0,
    "Nel materiale `dist-upgrade` e' descritto come aggiornamento completo del sistema."
  ),
  q(
    28,
    "03 - Gestione Software.md",
    "Quale comando cerca un pacchetto per nome o descrizione nella cache APT?",
    [
      "`apt-cache search <pkg>`",
      "`apt-mark search <pkg>`",
      "`dpkg -i <pkg>`",
      "`apt-get upgrade <pkg>`"
    ],
    0,
    "La ricerca pacchetti nel file e' affidata a `apt-cache search`."
  ),
  q(
    29,
    "03 - Gestione Software.md",
    "Quale comando mostra informazioni di versione e policy di un pacchetto nella cache APT?",
    [
      "`apt-cache policy <pkg>`",
      "`apt-get policy <pkg>`",
      "`dpkg -l <pkg>`",
      "`apt-mark policy <pkg>`"
    ],
    0,
    "Il comando indicato nel file e' `apt-cache policy`."
  ),
  q(
    30,
    "03 - Gestione Software.md",
    "Quale comando mette un pacchetto in stato di blocco per impedirne l'aggiornamento?",
    [
      "`apt-mark hold <pkg>`",
      "`apt-mark freeze <pkg>`",
      "`dpkg -l <pkg>`",
      "`apt-cache hold <pkg>`"
    ],
    0,
    "Nel file `apt-mark hold` e `apt-mark unhold` sono presentati come coppia blocco/sblocco."
  ),
  q(
    31,
    "03 - Gestione Software.md",
    "Quale comando rimuove il blocco precedentemente posto su un pacchetto?",
    [
      "`apt-mark unlock <pkg>`",
      "`apt-get unhold <pkg>`",
      "`apt-mark unhold <pkg>`",
      "`dpkg -P <pkg>`"
    ],
    2,
    "La forma riportata nella cartella e' `apt-mark unhold <pkg>`."
  ),
  q(
    32,
    "03 - Gestione Software.md",
    "Quale comando `dpkg` installa un pacchetto gia' disponibile localmente?",
    [
      "`dpkg -l <pkg>`",
      "`dpkg -i <pkg>`",
      "`dpkg -P <pkg>`",
      "`dpkg -r <pkg>`"
    ],
    1,
    "`dpkg -i` e' il comando di installazione locale riportato nel file."
  ),
  q(
    33,
    "03 - Gestione Software.md",
    "Quale comando `dpkg` elenca i pacchetti installati?",
    [
      "`dpkg -s`",
      "`dpkg -L`",
      "`dpkg -l`",
      "`dpkg -i`"
    ],
    2,
    "Nel riassunto di gestione software `dpkg -l` e' usato per la lista dei pacchetti."
  ),
  q(
    34,
    "04 - SMB, OpenSSH e NFS.md",
    "Su quale porta gira il servizio OpenSSH nella configurazione standard?",
    [
      "21/TCP",
      "22/TCP",
      "111/TCP",
      "445/TCP"
    ],
    1,
    "La porta standard di OpenSSH, richiamata anche negli appunti, e' 22/TCP."
  ),
  q(
    35,
    "04 - SMB, OpenSSH e NFS.md",
    "Qual e' il nome del pacchetto server corretto per offrire accesso OpenSSH alla macchina?",
    [
      "`openssh-client`",
      "`openssh-common`",
      "`openssh-server`",
      "`sshd-tools`"
    ],
    2,
    "Per esporre il demone SSH lato server il pacchetto corretto e' `openssh-server`."
  ),
  q(
    36,
    "04 - SMB, OpenSSH e NFS.md",
    "Dove si trova il file di configurazione del demone OpenSSH server?",
    [
      "`/etc/ssh/ssh_config`",
      "`/etc/ssh/sshd_config`",
      "`~/.ssh/config`",
      "`/var/log/ssh/sshd_config`"
    ],
    1,
    "Nel materiale e' esplicitata la differenza tra `ssh_config` client e `sshd_config` server."
  ),
  q(
    37,
    "04 - SMB, OpenSSH e NFS.md",
    "Quale modifica disabilita l'autenticazione con password in OpenSSH?",
    [
      "Impostare `UsePAM no` e riavviare il server",
      "Impostare `PermitRootLogin no` e riavviare il server",
      "Impostare `PasswordAuthentication no` in `sshd_config` e ricaricare il servizio",
      "Cancellare `~/.ssh/known_hosts` lato client"
    ],
    2,
    "La domanda del file richiama proprio la direttiva `PasswordAuthentication no`."
  ),
  q(
    38,
    "04 - SMB, OpenSSH e NFS.md",
    "Qual e' la porta principale del servizio NFS moderno e a cosa serve la 111 citata spesso nello stesso contesto?",
    [
      "NFS usa 111/TCP; la 2049 serve solo a rsync",
      "NFS usa 2049/TCP; la 111 e' quella di `rpcbind`/portmapper",
      "NFS usa 445/TCP; la 111 serve a Samba",
      "NFS usa 22/TCP; la 111 serve a mount locali"
    ],
    1,
    "Gli appunti distinguono bene la 2049 del servizio NFS dalla 111 usata dal portmapper RPC."
  ),
  q(
    39,
    "04 - SMB, OpenSSH e NFS.md",
    "Qual e' il file di configurazione principale delle esportazioni NFS?",
    [
      "`/etc/fstab`",
      "`/etc/nfs.conf`",
      "`/etc/exports`",
      "`/srv/nfs/exports.conf`"
    ],
    2,
    "Nel materiale NFS la configurazione delle share esportate passa da `/etc/exports`."
  ),
  q(
    40,
    "04 - SMB, OpenSSH e NFS.md",
    "Come si ricarica correttamente la configurazione delle esportazioni NFS dopo una modifica?",
    [
      "`systemctl restart nfsd`",
      "`mount -a`",
      "`exportfs -rv`",
      "`rpcbind --reload`"
    ],
    2,
    "La cartella Domande richiama `exportfs -rv` per riallineare le esportazioni."
  ),
  q(
    41,
    "04 - SMB, OpenSSH e NFS.md",
    "Quale differenza descrive correttamente `root_squash` rispetto a `no_root_squash` in NFS?",
    [
      "`root_squash` rimappa il root remoto a un utente non privilegiato, `no_root_squash` conserva i privilegi di root",
      "`root_squash` blocca solo la scrittura, `no_root_squash` blocca solo la lettura",
      "`root_squash` serve solo con NFSv2, `no_root_squash` solo con NFSv4",
      "`root_squash` cifra il traffico, `no_root_squash` lo lascia in chiaro"
    ],
    0,
    "Negli appunti `root_squash` e `no_root_squash` sono distinti proprio sul trattamento del root remoto."
  ),
  q(
    42,
    "04 - SMB, OpenSSH e NFS.md",
    "Su quale porta gira il moderno SMB diretto senza NetBIOS?",
    [
      "137/TCP",
      "139/TCP",
      "445/TCP",
      "111/TCP"
    ],
    2,
    "Nel materiale Samba la porta moderna e' 445/TCP."
  ),
  q(
    43,
    "04 - SMB, OpenSSH e NFS.md",
    "Qual e' il file di configurazione principale di Samba?",
    [
      "`/etc/samba/smb.conf`",
      "`/etc/smbd.conf`",
      "`/var/log/samba/smb.conf`",
      "`/etc/samba/exports`"
    ],
    0,
    "La configurazione centrale di Samba e' `smb.conf` sotto `/etc/samba/`."
  ),
  q(
    44,
    "05 - DNS e cron.md",
    "Su quale porta gira un server DNS per le query standard, secondo gli appunti?",
    [
      "53/UDP, con uso di 53/TCP per casi specifici come trasferimenti di zona",
      "53/TCP esclusiva, senza uso di UDP",
      "67/UDP per query e 68/UDP per risposte",
      "111/TCP per query e 2049/TCP per i trasferimenti"
    ],
    0,
    "Il DNS usa di norma 53/UDP, mentre 53/TCP viene citata per query pesanti e zone transfer."
  ),
  q(
    45,
    "05 - DNS e cron.md",
    "Quale associazione record DNS -> funzione e' corretta?",
    [
      "`MX` -> alias di host; `CNAME` -> server autoritativo",
      "`SOA` -> parametri globali della zona; `MX` -> server di posta",
      "`AAAA` -> indirizzo IPv4; `A` -> indirizzo IPv6",
      "`TXT` -> unico record ammesso nella root zone"
    ],
    1,
    "La domanda ampia sui campi DNS viene qui resa a risposta multipla usando le associazioni presenti negli appunti."
  ),
  q(
    46,
    "05 - DNS e cron.md",
    "Quale tripletta di file distingue correttamente ordine di risoluzione, configurazione locale e server DNS esterni da consultare?",
    [
      "`/etc/hosts`, `/etc/passwd`, `/etc/bind/named.conf`",
      "`/etc/nsswitch.conf`, `/etc/hosts`, `/etc/resolv.conf`",
      "`/etc/resolv.conf`, `/etc/fstab`, `/etc/hosts.allow`",
      "`/etc/netplan/50-cloud-init.yaml`, `/etc/hosts`, `/etc/bind/db.local`"
    ],
    1,
    "Gli appunti DNS distinguono `nsswitch.conf`, `hosts` e `resolv.conf`."
  ),
  q(
    47,
    "05 - DNS e cron.md",
    "Quale ordine riflette correttamente la gerarchia della risoluzione DNS descritta negli appunti?",
    [
      "Server autoritativi -> TLD -> Root server",
      "Root server -> TLD -> server autoritativi",
      "Resolver locale -> SMTP -> Root server",
      "TLD -> Root server -> `/etc/hosts`"
    ],
    1,
    "Il materiale riporta la classica gerarchia root, TLD, autoritativi."
  ),
  q(
    48,
    "05 - DNS e cron.md",
    "Che cosa si intende per stack LAMP?",
    [
      "Linux, Apache, MySQL/MariaDB, PHP",
      "Linux, Ansible, MongoDB, Python",
      "LDAP, Apache, Mail, PostgreSQL",
      "Linux, Asterisk, MySQL, Perl"
    ],
    0,
    "La domanda sullo stack LAMP si riconduce al significato classico dell'acronimo."
  ),
  q(
    49,
    "05 - DNS e cron.md",
    "Che cosa indica l'acronimo GFS nel contesto dei backup?",
    [
      "General File Snapshot",
      "Grandfather, Father, Son",
      "Group File Synchronization",
      "Global Filesystem Service"
    ],
    1,
    "Negli appunti MySQL/backup GFS e' spiegato come rotazione Grandfather, Father, Son."
  ),
  q(
    50,
    "05 - DNS e cron.md",
    "Qual e' il file di configurazione di sistema dei crontab menzionato nel materiale?",
    [
      "`/etc/crontab`",
      "`/var/spool/cron/root`",
      "`/etc/cron.conf`",
      "`/usr/lib/systemd/timers.conf`"
    ],
    0,
    "Nelle note sui cron job di sistema compare esplicitamente `/etc/crontab`."
  ),
  q(
    51,
    "05 - DNS e cron.md",
    "Qual e' l'ordine corretto dei campi in `/etc/crontab`?",
    [
      "Minuto, Ora, Giorno del mese, Mese, Giorno della settimana, Utente, Comando",
      "Ora, Minuto, Mese, Giorno del mese, Utente, Comando, Giorno della settimana",
      "Utente, Minuto, Ora, Giorno del mese, Mese, Giorno della settimana, Comando",
      "Minuto, Ora, Giorno del mese, Mese, Giorno della settimana, Comando"
    ],
    0,
    "Nel file di sistema `/etc/crontab` compare anche il campo utente prima del comando."
  ),
  q(
    52,
    "05 - DNS e cron.md",
    "Quale riga di crontab esegue un job ogni lunedi alle 15:00 usando la sintassi di `/etc/crontab`?",
    [
      "`0 15 * * 1 root comando`",
      "`15 0 * * 1 root comando`",
      "`0 15 1 * * root comando`",
      "`15 * * * 1 root comando`"
    ],
    0,
    "Nel formato di `/etc/crontab`, `0 15 * * 1` significa lunedi alle 15:00."
  ),
  q(
    53,
    "05 - DNS e cron.md",
    "Quale comando e' il piu' adatto per mostrare solo i record di un dominio senza informazioni aggiuntive di contorno?",
    [
      "`dig +short example.com`",
      "`ping -v example.com`",
      "`curl example.com`",
      "`host -T example.com | less`"
    ],
    0,
    "Per ottenere un output sintetico dei record, `dig +short` e' l'approccio piu' aderente alla richiesta della domanda."
  ),
  q(
    54,
    "06 - Apache e Ansible.md",
    "A cosa serve Apache e su quali porte si mette normalmente in ascolto?",
    [
      "Serve per file sharing SMB e usa 139 e 445",
      "Serve come web server e usa 80 e 443",
      "Serve come DNS server e usa 53 e 853",
      "Serve come database server e usa 3306 e 33060"
    ],
    1,
    "Negli appunti Apache viene presentato come web server in ascolto su 80 e 443."
  ),
  q(
    55,
    "06 - Apache e Ansible.md",
    "Quale directory e' la document root di default tipica di Apache su Debian/Ubuntu?",
    [
      "`/srv/www/default`",
      "`/usr/share/apache2/html`",
      "`/var/www/html`",
      "`/etc/apache2/sites-enabled`"
    ],
    2,
    "Per la domanda sulla cartella di default, la risposta attesa in ambiente Debian/Ubuntu e' `/var/www/html`."
  ),
  q(
    56,
    "06 - Apache e Ansible.md",
    "Che cosa sono i Virtual Host in Apache?",
    [
      "Container LXC avviati da Apache per sito",
      "Direttive che permettono di servire piu' siti distinti dallo stesso server",
      "Processi MPM separati per ogni porta",
      "Share SMB montate dentro `/var/www`"
    ],
    1,
    "Gli appunti chiariscono che i Virtual Host sono direttive per ospitare piu' siti sullo stesso server."
  ),
  q(
    57,
    "06 - Apache e Ansible.md",
    "Quale combinazione abbina correttamente i comandi helper Apache a moduli, siti e configurazioni?",
    [
      "`a2enmod` per moduli, `a2ensite` per siti, `a2enconf` per configurazioni globali",
      "`a2ensite` per moduli, `a2enmod` per siti, `systemctl` per configurazioni globali",
      "`apachectl enable` per moduli, `a2enconf` per siti, `a2ensite` per servizi",
      "`a2dissite` per moduli, `a2dismod` per servizi, `a2enmod` per conf globali"
    ],
    0,
    "La tabella negli appunti Apache distingue chiaramente `a2enmod`, `a2ensite` e `a2enconf`."
  ),
  q(
    58,
    "06 - Apache e Ansible.md",
    "Quale affermazione descrive correttamente gli MPM di Apache presentati nel materiale?",
    [
      "`prefork` usa thread, `worker` usa processi isolati, `event` e' solo per UDP",
      "`prefork` usa processi, `worker` usa thread, `event` ottimizza la gestione delle connessioni keep-alive",
      "`worker` e `event` sono identici, cambia solo il nome del file di configurazione",
      "`prefork` e' l'unico MPM che non supporta PHP in alcun caso"
    ],
    1,
    "Negli appunti Apache i tre MPM sono distinti per modello di concorrenza e gestione delle connessioni."
  ),
  q(
    59,
    "06 - Apache e Ansible.md",
    "Quale sequenza prepara correttamente un workflow Ansible secondo il materiale locale?",
    [
      "Creare prima i ruoli, poi installare Docker, infine generare le chiavi SSH sui target",
      "Preparare inventory e accesso SSH, verificare con `ansible -i inventory -m ping all`, poi eseguire il playbook",
      "Avviare subito `ansible-playbook` e generare l'inventory solo se fallisce",
      "Installare Apache sui target manualmente, poi usare Ansible solo per il logging"
    ],
    1,
    "Nel file Ansible compaiono come passi: inventory, chiavi SSH, verifica con `ping` e poi esecuzione del playbook."
  )
];
