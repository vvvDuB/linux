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
    "Per collegare correttamente il server a una rete IPv4 con accesso esterno servono indirizzo IP, netmask, gateway predefinito e almeno un DNS."
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
    "L'indirizzo si assegna con `ip address add`, mentre il gateway predefinito si imposta con `ip route add default via`."
  ),
  q(
    3,
    "01 - Networking e SSH.md",
    "Se un indirizzo configurato con il comando `ip` scompare dopo il riavvio, quale approccio lo rende persistente?",
    [
      "Rieseguire `ip address add` da `cron.daily`",
      "Salvare la configurazione in un file di rete persistente, ad esempio `/etc/network/interfaces`, e applicarla con `netplan apply`",
      "Aggiungere l'indirizzo a `/etc/hosts`",
      "Usare `ss -punta` per fissare la configurazione nel kernel"
    ],
    1,
    "Un indirizzo assegnato con `ip` vale solo fino al riavvio se non viene riportato in una configurazione persistente di rete e poi applicato."
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
      "`ss -punta | grep -v \"0.0.0.0\" | grep udp | awk '{ print $6 }'`",
      "`ip route | grep ESTAB | awk '{ print $6 }'`"
    ],
    2,
    "L'obiettivo e' ottenere la colonna con l'endpoint remoto filtrando l'output di `ss` con `grep` e `awk`."
  ),
  q(
    7,
    "01 - Networking e SSH.md",
    "Quale pipeline e' la piu' corretta per elencare gli indirizzi locali su cui processi locali sono in ascolto?",
    [
      "`ss -punta | grep -v \"Local\" | awk '{ print $5 $7 }'`",
      "`ss -punta | grep ESTAB | awk '{ print $6 }'`",
      "`ps aux | grep LISTEN | awk '{ print $5 }'`",
      "`tcpdump -i eth0 | awk '{ print $5 }'`"
    ],
    0,
    "Per ottenere gli indirizzi locali in ascolto si parte da `ss` e si estrae la parte locale delle righe rilevanti."
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
      "Ricevente: `nc -lp 9000 > file.txt` | Mittente: `nc host:9000 < file.txt`",
      "Ricevente: `nc host 9000 > file.txt` | Mittente: `nc -l -p 9000 < file.txt`",
      "Ricevente: `scp -l 9000 > file.txt` | Mittente: `nc host:9000 file.txt`",
      "Ricevente: `netplan try > file.txt` | Mittente: `nc host 9000 | cat file.txt`"
    ],
    0,
    "Il listener riceve sul proprio stdout e lo redirige su file; il mittente passa il contenuto del file allo stdin di `nc`."
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
    "`netplan apply` applica la configurazione, mentre `netplan try` la prova in modo temporaneo e in molti casi consente di tornare automaticamente alla configurazione precedente."
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
    "Netplan usa file YAML collocati sotto `/etc/netplan/`."
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
    "La porta predefinita del server MySQL e' 3306/TCP."
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
    "`SHOW TABLES;` elenca le tabelle del database correntemente selezionato."
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
    "`SHOW COLUMNS FROM nome_tabella;` restituisce l'elenco delle colonne della tabella indicata."
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
    "Le quattro operazioni CRUD corrispondono a `INSERT`, `UPDATE`, `SELECT` e `DELETE`."
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
    "`mysqldump --all-databases` produce un dump logico di tutti i database del server."
  ),
  q(
    20,
    "02 - MySQL.md",
    "Per quale motivo si preferisce un dump logico a una copia diretta dei file usati da MySQL?",
    [
      "Perche' i file raw non preservano mai i permessi UNIX",
      "Perche' la copia diretta puo' essere incoerente se il server e' attivo",
      "Perche' MySQL salva sempre i dati cifrati in RAM e mai su disco",
      "Perche' il dump e' l'unico metodo che mantiene il numero di inode"
    ],
    1,
    "Un dump logico e' pensato per backup e ripristino; copiare i file a caldo puo' produrre uno stato incoerente."
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
    "Lavorare in transazione e controllare bene il filtro prima del `COMMIT` riduce il rischio di modifiche massive accidentali."
  ),
  q(
    22,
    "03 - Gestione Software.md",
    "Che cosa fa `apt-get update`?",
    [
      "Installa tutti gli aggiornamenti disponibili",
      "Aggiorna il database delle fonti dei pacchetti",
      "Pulisce la cache locale dei `.deb`",
      "Rimuove i pacchetti obsoleti"
    ],
    1,
    "Aggiorna l'indice locale dei pacchetti disponibili dai repository configurati."
  ),
  q(
    23,
    "03 - Gestione Software.md",
    "Qual e' l'effetto di `apt-get upgrade`?",
    [
      "Installa un singolo pacchetto da repository locale",
      "Installa tutti gli aggiornamenti disponibili",
      "Blocca i pacchetti all'ultima versione funzionante",
      "Elimina le configurazioni non usate"
    ],
    1,
    "Aggiorna i pacchetti installati alle versioni piu' recenti disponibili senza cambiare radicalmente la composizione del sistema."
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
    "`apt-get install <pkg>` e' il comando standard per installare un pacchetto tramite APT."
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
    "`remove` disinstalla il pacchetto ma tende a lasciare i file di configurazione."
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
    "`purge` rimuove sia il pacchetto sia i file di configurazione associati."
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
    "`apt-get dist-upgrade` gestisce un aggiornamento piu' esteso del sistema, includendo eventuali cambi di dipendenze."
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
    "`apt-cache search` cerca pacchetti nell'indice APT per nome o descrizione."
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
    "`apt-cache policy` mostra versione installata, candidata e origini del pacchetto."
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
    "`apt-mark hold` impedisce che il pacchetto venga aggiornato."
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
    "`apt-mark unhold` rimuove il blocco precedentemente applicato con `hold`."
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
    "`dpkg -i` installa un pacchetto `.deb` gia' disponibile localmente."
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
    "`dpkg -l` elenca i pacchetti installati sul sistema."
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
    "OpenSSH usa di default la porta 22/TCP."
  ),
  q(
    35,
    "04 - SMB, OpenSSH e NFS.md",
    "Qual e' il nome del pacchetto server corretto per offrire accesso OpenSSH alla macchina?",
    [
      "`openssh-client`",
      "`openssh-common`",
      "`openssh-server` (famiglia `openssh-*` lato server)",
      "`sshd-tools`"
    ],
    2,
    "Per esporre il demone SSH lato server si usa `openssh-server`; il materiale richiama la famiglia di pacchetti `openssh-*`."
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
    "`sshd_config` regola il demone server, mentre `ssh_config` riguarda il lato client."
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
    "Per disabilitare l'accesso via password si porta la direttiva `PasswordAuthentication` a `no` in `sshd_config` e poi si ricarica il servizio."
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
    "Il servizio NFS usa tipicamente la 2049, mentre la 111 e' associata al servizio RPC/portmapper."
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
    "Le esportazioni NFS vengono definite in `/etc/exports`."
  ),
  q(
    40,
    "04 - SMB, OpenSSH e NFS.md",
    "Come si ricarica correttamente la configurazione delle esportazioni NFS dopo una modifica?",
    [
      "`systemctl restart nfsd`",
      "`mount -a`",
      "`exportfs -ar`",
      "`rpcbind --reload`"
    ],
    2,
    "`exportfs -ar` rilegge il file delle esportazioni e riapplica la configurazione NFS."
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
    "La differenza riguarda il trattamento del root remoto: mappato a utente non privilegiato oppure lasciato con privilegi elevati."
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
    "SMB moderno usa normalmente la porta 445/TCP."
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
    "Su quale porta gira un server DNS per le query standard?",
    [
      "53/UDP, con uso di 53/TCP per casi specifici come trasferimenti di zona",
      "53/TCP esclusiva, senza uso di UDP",
      "67/UDP per query e 68/UDP per risposte",
      "111/TCP per query e 2049/TCP per i trasferimenti"
    ],
    0,
    "Le query DNS ordinarie usano tipicamente 53/UDP; 53/TCP entra in gioco in casi come trasferimenti di zona o risposte piu' grandi."
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
    "`SOA` descrive i parametri della zona, mentre `MX` identifica i server di posta."
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
    "`nsswitch.conf` definisce l'ordine di risoluzione, `/etc/hosts` fornisce override locali e `/etc/resolv.conf` elenca i resolver DNS."
  ),
  q(
    47,
    "05 - DNS e cron.md",
    "Quale ordine riflette correttamente la gerarchia della risoluzione DNS?",
    [
      "Server autoritativi -> TLD -> Root server",
      "Root server -> TLD -> server autoritativi",
      "Resolver locale -> SMTP -> Root server",
      "TLD -> Root server -> `/etc/hosts`"
    ],
    1,
    "La risoluzione DNS segue la gerarchia root server, TLD e infine server autoritativi."
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
    "GFS e' il modello di rotazione Grandfather, Father, Son."
  ),
  q(
    50,
    "05 - DNS e cron.md",
    "Qual e' il file di configurazione di sistema dei crontab?",
    [
      "`/etc/crontab`",
      "`/var/spool/cron/root`",
      "`/etc/cron.conf`",
      "`/usr/lib/systemd/timers.conf`"
    ],
    0,
    "Il file di sistema usato per il crontab globale e' `/etc/crontab`."
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
    "Nel formato di `/etc/crontab` compare anche il campo utente prima del comando da eseguire."
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
    "06 - Apache e DHCP.md",
    "A cosa serve Apache e su quali porte si mette normalmente in ascolto?",
    [
      "Serve per file sharing SMB e usa 139 e 445",
      "Serve come web server e usa 80 e 443",
      "Serve come DNS server e usa 53 e 853",
      "Serve come database server e usa 3306 e 33060"
    ],
    1,
    "Apache e' un web server opensource e usa normalmente le porte 80 e 443 per HTTP e HTTPS."
  ),
  q(
    55,
    "06 - Apache e DHCP.md",
    "Quale directory e' la document root di default tipica di Apache su Debian/Ubuntu?",
    [
      "`/srv/www/default`",
      "`/usr/share/apache2/html`",
      "`/var/www/html`",
      "`/etc/apache2/sites-enabled`"
    ],
    2,
    "Su Debian/Ubuntu la document root di default piu' comune e' `/var/www/html`, che corrisponde alla cartella del sito predefinito."
  ),
  q(
    56,
    "06 - Apache e DHCP.md",
    "Che cosa sono i Virtual Host in Apache?",
    [
      "Container LXC avviati da Apache per sito",
      "Direttive che permettono di servire piu' siti distinti dallo stesso server",
      "Processi MPM separati per ogni porta",
      "Share SMB montate dentro `/var/www`"
    ],
    1,
    "I Virtual Host permettono di pubblicare piu' siti o configurazioni distinte sullo stesso server Apache."
  ),
  q(
    57,
    "06 - Apache e DHCP.md",
    "Quale combinazione abbina correttamente i comandi helper Apache a moduli, siti e configurazioni?",
    [
      "`a2enmod` per moduli, `a2ensite` per siti, `a2enconf` per configurazioni globali",
      "`a2ensite` per moduli, `a2enmod` per siti, `systemctl` per configurazioni globali",
      "`apachectl enable` per moduli, `a2enconf` per siti, `a2ensite` per servizi",
      "`a2dissite` per moduli, `a2dismod` per servizi, `a2enmod` per conf globali"
    ],
    0,
    "Gli helper Apache usano il prefisso `a2`; `a2enmod`, `a2ensite` e `a2enconf` abilitano rispettivamente moduli, siti e configurazioni."
  ),
  q(
    58,
    "06 - Apache e DHCP.md",
    "Quale affermazione descrive correttamente gli MPM di Apache?",
    [
      "`prefork` usa thread, `worker` usa processi isolati, `event` e' solo per UDP",
      "`prefork` usa processi, `worker` usa thread, `event` ottimizza la gestione delle connessioni keep-alive",
      "`worker` e `event` sono identici, cambia solo il nome del file di configurazione",
      "`prefork` e' l'unico MPM che non supporta PHP in alcun caso"
    ],
    1,
    "`prefork` usa processi separati, `worker` combina pochi processi e thread, `event` ottimizza meglio la gestione delle connessioni persistenti."
  ),
  q(
    59,
    "06 - Apache e DHCP.md",
    "Quale sequenza prepara correttamente un workflow Ansible?",
    [
      "Creare prima i ruoli, poi installare Docker, infine generare le chiavi SSH sui target",
      "Preparare inventory e accesso SSH, verificare con `ansible -i inventory -m ping all`, poi eseguire il playbook",
      "Avviare subito `ansible-playbook` e generare l'inventory solo se fallisce",
      "Installare Apache sui target manualmente, poi usare Ansible solo per il logging"
    ],
    1,
    "Un flusso minimo Ansible parte da inventory e accesso SSH, verifica la connettivita' e poi esegue il playbook."
  ),
  q(
    60,
    "07 - Apache e altro.md",
    "Su quale porta e su quali indirizzi si mette in ascolto il server Apache una volta installato?",
    [
      "Sulla 80/TCP e, se HTTPS e' attivo, anche sulla 443/TCP, in ascolto su tutti gli IP assegnati",
      "Solo sulla 8080/TCP in ascolto esclusivamente su `127.0.0.1`",
      "Sulla 111/TCP e sulla 2049/TCP per tutte le interfacce",
      "Solo sulla 443/TCP, ma unicamente sull'interfaccia loopback"
    ],
    0,
    "Dopo l'installazione Apache espone normalmente HTTP su 80 e, se configurato, HTTPS su 443, tipicamente su tutti gli indirizzi disponibili."
  ),
  q(
    61,
    "07 - Apache e altro.md",
    "Che cosa contiene la directory `/etc/apache2/sites-available`? E che cosa contiene `/etc/apache2/sites-enabled`?",
    [
      "La prima contiene i log dei siti, la seconda i certificati TLS attivi",
      "La prima contiene i file di configurazione dei vhost, la seconda i symlink dei siti abilitati",
      "La prima contiene moduli compilati, la seconda solo file CGI",
      "La prima contiene i dump delle sessioni, la seconda le PID file"
    ],
    1,
    "Le directory `sites-available` e `sites-enabled` seguono la logica Debian di file reali piu' symlink attivi."
  ),
  q(
    62,
    "07 - Apache e altro.md",
    "Che cosa contiene la directory `/etc/apache2/mods-available`? E che cosa contiene `/etc/apache2/mods-enabled`?",
    [
      "La prima ospita i moduli disponibili, la seconda i symlink dei moduli effettivamente abilitati",
      "La prima contiene solo moduli caricati in RAM, la seconda quelli presenti su disco",
      "La prima contiene i siti in HTTP, la seconda i siti in HTTPS",
      "La prima e' usata su RedHat, la seconda su Debian"
    ],
    0,
    "Anche per i moduli Apache usa la logica `available`/`enabled` tipica delle distribuzioni Debian."
  ),
  q(
    63,
    "07 - Apache e altro.md",
    "Che cos'e' un virtual host?",
    [
      "Una direttiva/configurazione che consente di pubblicare piu' siti distinti con lo stesso server Apache",
      "Un processo MPM dedicato a una singola richiesta HTTP",
      "Una VM LXC creata automaticamente da Apache per ogni dominio",
      "Un record DNS speciale che sostituisce il file `/etc/hosts`"
    ],
    0,
    "Un virtual host e' una configurazione logica di Apache, non una macchina separata."
  ),
  q(
    64,
    "07 - Apache e altro.md",
    "Che cosa e' un MPM nel contesto di Apache?",
    [
      "Un file di log multi-processo scritto sotto `/var/log/apache2/`",
      "Un modulo che definisce il modello di concorrenza con cui Apache gestisce processi e thread",
      "Una tecnica di caching dei moduli PHP in memoria condivisa",
      "Una policy di routing HTTP tra piu' virtual host"
    ],
    1,
    "Gli MPM sono i moduli architetturali di Apache che governano il modo in cui tratta le richieste concorrenti."
  ),
  q(
    65,
    "07 - Apache e altro.md",
    "Quale differenza descrive correttamente gli MPM `prefork`, `worker` ed `event`?",
    [
      "`prefork` usa processi isolati, `worker` usa thread, `event` ottimizza la gestione delle connessioni keep-alive",
      "`prefork` usa thread, `worker` usa processi, `event` e' riservato a FastCGI",
      "`worker` e `event` sono la stessa modalita' con due nomi storici diversi",
      "`prefork` funziona solo in HTTPS, `worker` solo in HTTP"
    ],
    0,
    "La differenza sta nel modo in cui Apache combina processi, thread e gestione delle connessioni persistenti."
  ),
  q(
    66,
    "07 - Apache e altro.md",
    "Quali comandi bisogna eseguire per cambiare l'MPM in uso in Apache su un sistema Debian/Ubuntu?",
    [
      "Disabilitare l'MPM attuale con `a2dismod`, abilitare quello desiderato con `a2enmod`, poi ricaricare o riavviare Apache",
      "Modificare `/etc/hosts`, poi eseguire `apache2ctl graceful --mpm=<nome>`",
      "Cambiare il nome del binary `/usr/sbin/apache2` e poi lanciare `systemctl daemon-reexec`",
      "Usare `a2ensite` per l'MPM nuovo e `a2dissite` per quello precedente"
    ],
    0,
    "Il cambio dell'MPM passa per la gestione dei moduli e la successiva ricarica della configurazione del server."
  ),
  q(
    67,
    "07 - Apache e altro.md",
    "Con quale semplice tool si possono generare richieste HTTP in parallelo per verificare il comportamento di Apache?",
    [
      "`tcpdump`",
      "`ab`",
      "`ss`",
      "`pv`"
    ],
    1,
    "`ab` e' Apache Bench, uno strumento semplice per generare richieste HTTP in parallelo."
  ),
  q(
    68,
    "07 - Apache e altro.md",
    "Qual e' il nome del processo Apache su un sistema Ubuntu GNU/Linux? E su un sistema RedHat?",
    [
      "`apache2` su Ubuntu e `httpd` su RedHat",
      "`httpd` su Ubuntu e `apache2d` su RedHat",
      "`apachectl` su Ubuntu e `systemd-http` su RedHat",
      "`apache` su Ubuntu e `rhttpd` su RedHat"
    ],
    0,
    "Nelle famiglie Debian/Ubuntu il nome tipico e' `apache2`, mentre su RedHat e' `httpd`."
  ),
  q(
    69,
    "07 - Apache e altro.md",
    "Quale comando si puo' usare per verificare la correttezza della configurazione di Apache su Ubuntu GNU/Linux? E quale e' l'equivalente tipico su RedHat?",
    [
      "`apache2ctl configtest` su Ubuntu e `httpd -t` su RedHat",
      "`systemctl status apache2` su Ubuntu e `chkconfig httpd` su RedHat",
      "`apache2ctl graceful` su Ubuntu e `service httpd configtest` su RedHat",
      "`a2enconf --test` su Ubuntu e `httpd --lint` su RedHat"
    ],
    0,
    "Su Ubuntu la verifica sintattica passa da `apache2ctl configtest`; su RedHat il controllo equivalente tipico e' `httpd -t`."
  ),
  q(
    70,
    "07 - Apache e altro.md",
    "Che differenza c'e' tra `systemctl restart apache2` e `apache2ctl graceful`?",
    [
      "`restart` riavvia il servizio in modo pieno, `graceful` ricarica la configurazione cercando di non interrompere bruscamente le connessioni in corso",
      "`restart` rilegge solo i moduli, `graceful` rilegge solo i virtual host",
      "Sono equivalenti e differiscono solo per il path del comando",
      "`graceful` pulisce la cache dei pacchetti Apache, `restart` no"
    ],
    0,
    "`apache2ctl graceful` prova a ricaricare il server in modo meno traumatico per le connessioni attive rispetto a un restart completo."
  )
];
