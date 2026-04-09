export const questions = [
  {
    id: 1,
    topic: "Rete e OpenSSH",
    source: "16-Configurazione della rete e OpenSSH.md",
    prompt: "Cosa mostra il comando `ss -punta`?",
    options: [
      "Solo le route statiche configurate",
      "Tutti i socket con porte, stato e processo associato",
      "Solo i login SSH falliti",
      "Solo le interfacce di loopback"
    ],
    answer: 1,
    explanation:
      "`ss -punta` include TCP, UDP, output numerico, socket in ascolto o stabiliti e processo collegato."
  },
  {
    id: 2,
    topic: "Rete e OpenSSH",
    source: "16-Configurazione della rete e OpenSSH.md",
    prompt: "Quale comando aggiunge un default gateway temporaneo?",
    options: [
      "sudo ip route add default via 192.168.122.1",
      "sudo ip link add default 192.168.122.1",
      "sudo resolvectl add default 192.168.122.1",
      "sudo ssh default via 192.168.122.1"
    ],
    answer: 0,
    explanation:
      "La sintassi corretta per la route di default usa `ip route add default via ...`."
  },
  {
    id: 3,
    topic: "Rete e OpenSSH",
    source: "16-Configurazione della rete e OpenSSH.md",
    prompt: "Che caratteristica hanno le modifiche fatte direttamente con i comandi `ip`?",
    options: [
      "Sono replicate automaticamente su tutte le interfacce",
      "Restano valide solo fino al riavvio o al reset dell'interfaccia",
      "Sono sempre persistenti grazie a systemd",
      "Si applicano solo a connessioni VPN"
    ],
    answer: 1,
    explanation:
      "Le modifiche manuali con `ip` agiscono sul kernel in esecuzione e sono effimere."
  },
  {
    id: 4,
    topic: "Rete e OpenSSH",
    source: "16-Configurazione della rete e OpenSSH.md",
    prompt: "Quale comando di netplan prova una configurazione con rollback automatico se qualcosa va storto?",
    options: [
      "sudo netplan flush",
      "sudo netplan generate",
      "sudo netplan apply",
      "sudo netplan try"
    ],
    answer: 3,
    explanation:
      "`netplan try` testa temporaneamente la configurazione e torna indietro se non viene confermata."
  },
  {
    id: 5,
    topic: "Rete e OpenSSH",
    source: "16-Configurazione della rete e OpenSSH.md",
    prompt: "A cosa serve il file `~/.ssh/known_hosts`?",
    options: [
      "A salvare le password degli utenti autorizzati",
      "A conservare le fingerprint dei server già conosciuti",
      "A definire i log del demone `sshd`",
      "A contenere le chiavi private del server remoto"
    ],
    answer: 1,
    explanation:
      "`known_hosts` conserva le impronte dei server incontrati e aiuta a rilevare possibili MITM."
  },
  {
    id: 6,
    topic: "NFS",
    source: "17-NFS.md",
    prompt: "Qual è un vantaggio pratico di NFSv4 rispetto a NFSv2/v3?",
    options: [
      "Usa solo broadcast per il mount",
      "Richiede sempre UDP sulla porta 111",
      "Concentra quasi tutto sulla TCP 2049 riducendo la dipendenza da porte dinamiche",
      "Non supporta più il file locking"
    ],
    answer: 2,
    explanation:
      "NFSv4 usa una singola porta principale, TCP 2049, semplificando firewall e configurazione."
  },
  {
    id: 7,
    topic: "NFS",
    source: "17-NFS.md",
    prompt: "A cosa serve `rpcbind` o Portmapper in scenari NFS classici?",
    options: [
      "A comprimere i file prima del trasferimento",
      "A dire al client su quali porte dinamiche sono in ascolto i servizi RPC",
      "A cifrare automaticamente tutti i volumi esportati",
      "A sincronizzare gli utenti LDAP"
    ],
    answer: 1,
    explanation:
      "Con NFSv2/v3 il client interroga `rpcbind` sulla porta 111 per scoprire le porte RPC necessarie."
  },
  {
    id: 8,
    topic: "NFS",
    source: "17-NFS.md",
    prompt: "Dopo aver modificato `/etc/exports`, quale comando ricarica le esportazioni senza riavviare tutto il server?",
    options: [
      "sudo nfsd --reload",
      "sudo exportfs -rv",
      "sudo mount -a",
      "sudo rpcbind -f"
    ],
    answer: 1,
    explanation:
      "`exportfs -rv` riallinea la tabella export del kernel con il contenuto di `/etc/exports`."
  },
  {
    id: 9,
    topic: "NFS",
    source: "17-NFS.md",
    prompt: "Cosa fa l'opzione `root_squash` in NFS?",
    options: [
      "Trasforma qualunque utente remoto in root locale",
      "Blocca solo le richieste in lettura",
      "Rimappa il root remoto all'utente `nobody`",
      "Disabilita completamente il mount remoto"
    ],
    answer: 2,
    explanation:
      "`root_squash` evita che il root del client mantenga privilegi root sul server NFS."
  },
  {
    id: 10,
    topic: "Samba",
    source: "18-Samba.md",
    prompt: "Qual è la funzione principale di Samba?",
    options: [
      "Fare routing dinamico tra VLAN",
      "Condividere file e stampanti tra Linux/Unix e Windows tramite SMB/CIFS",
      "Gestire solo tunnel VPN site-to-site",
      "Sostituire il kernel NFS"
    ],
    answer: 1,
    explanation:
      "Samba nasce per l'interoperabilità con il mondo Windows, soprattutto su file sharing e stampa."
  },
  {
    id: 11,
    topic: "Samba",
    source: "18-Samba.md",
    prompt: "Cosa può fare Samba 4 in un'infrastruttura moderna?",
    options: [
      "Agire come Domain Controller Active Directory completo",
      "Gestire solo stampanti USB locali",
      "Sostituire obbligatoriamente DNS e Kerberos con NFS",
      "Funzionare solo come client, mai come server"
    ],
    answer: 0,
    explanation:
      "Samba 4 può operare come AD DC e integra componenti come LDAP, DNS e Kerberos."
  },
  {
    id: 12,
    topic: "Samba",
    source: "18-Samba.md",
    prompt: "Quale requisito è particolarmente critico per Kerberos in ambiente Samba/AD?",
    options: [
      "Una sincronizzazione stretta degli orologi tra client e server",
      "La disattivazione del DNS locale",
      "L'uso obbligatorio della porta 22",
      "La presenza di almeno due schede di rete"
    ],
    answer: 0,
    explanation:
      "Kerberos è sensibile allo skew temporale: se gli orologi divergono, i ticket possono fallire."
  },
  {
    id: 13,
    topic: "DHCP",
    source: "19-DHCP.md",
    prompt: "Quali sono le porte standard del protocollo DHCP?",
    options: [
      "67 TCP lato server e 68 TCP lato client",
      "67 UDP lato server e 68 UDP lato client",
      "53 UDP lato server e 54 UDP lato client",
      "69 UDP lato server e 70 UDP lato client"
    ],
    answer: 1,
    explanation:
      "DHCP usa 67/UDP per il server e 68/UDP per il client."
  },
  {
    id: 14,
    topic: "DHCP",
    source: "19-DHCP.md",
    prompt: "Oltre all'indirizzo IP, quale insieme di parametri può assegnare un server DHCP?",
    options: [
      "Solo nome host e MAC address",
      "Gateway, DNS, netmask e time server",
      "Solo password e utenti di dominio",
      "Certificati TLS e chiavi private"
    ],
    answer: 1,
    explanation:
      "DHCP distribuisce anche parametri essenziali di rete come mask, gateway, DNS e talvolta NTP."
  },
  {
    id: 15,
    topic: "DHCP",
    source: "19-DHCP.md",
    prompt: "Come viene descritto `dnsmasq` negli appunti?",
    options: [
      "Un servizio solo SMTP per reti piccole",
      "Un demone leggero che offre DHCP e DNS caching",
      "Un sostituto completo di Apache",
      "Un tool di backup per database MySQL"
    ],
    answer: 1,
    explanation:
      "`dnsmasq` è indicato come soluzione leggera, adatta a piccole reti e homelab."
  },
  {
    id: 16,
    topic: "DNS",
    source: "20-DNS.md",
    prompt: "Se in `/etc/nsswitch.conf` trovi `hosts: files dns`, cosa significa?",
    options: [
      "Si interrogano prima i server root e poi `/etc/hosts`",
      "I file locali hanno precedenza sui DNS esterni",
      "Il DNS viene usato solo in IPv6",
      "Le query fallite vengono ritentate solo via TCP"
    ],
    answer: 1,
    explanation:
      "Con `files dns`, il sistema consulta prima `/etc/hosts` e solo dopo i resolver esterni."
  },
  {
    id: 17,
    topic: "DNS",
    source: "20-DNS.md",
    prompt: "Quale record DNS indica il server che riceve la posta per un dominio?",
    options: [
      "AAAA",
      "CNAME",
      "MX",
      "SOA"
    ],
    answer: 2,
    explanation:
      "Il record `MX` definisce i mail exchanger e la loro priorità."
  },
  {
    id: 18,
    topic: "DNS",
    source: "20-DNS.md",
    prompt: "A cosa serve un record `AAAA`?",
    options: [
      "A creare un alias verso un altro hostname",
      "Ad associare un nome a un indirizzo IPv6",
      "A definire il server di posta",
      "A indicare i timer di replica della zona"
    ],
    answer: 1,
    explanation:
      "`AAAA` è l'equivalente IPv6 del record `A`."
  },
  {
    id: 19,
    topic: "MySQL",
    source: "21-MySql.md",
    prompt: "Quale parametro va cambiato per esporre MySQL su tutte le interfacce?",
    options: [
      "`document-root`, impostandolo a `0.0.0.0`",
      "`bind-address`, impostandolo a `0.0.0.0`",
      "`server-name`, impostandolo a `0.0.0.0`",
      "`socket-address`, impostandolo a `localhost`"
    ],
    answer: 1,
    explanation:
      "Di default MySQL ascolta su loopback; per l'accesso remoto si modifica `bind-address`."
  },
  {
    id: 20,
    topic: "MySQL",
    source: "21-MySql.md",
    prompt: "A cosa serve l'utente `debian-sys-maint` su Debian/Ubuntu?",
    options: [
      "A creare automaticamente i database WordPress",
      "A gestire manutenzione e controllo del demone tramite script di sistema",
      "A fare query di sola lettura per gli utenti finali",
      "A firmare i backup con GPG"
    ],
    answer: 1,
    explanation:
      "Gli script di sistema lo usano per avvio, stop e manutenzione del servizio MySQL."
  },
  {
    id: 21,
    topic: "MySQL",
    source: "21-MySql.md",
    prompt: "Qual è l'approccio corretto per fare backup di un database MySQL acceso?",
    options: [
      "Copiare direttamente `/var/lib/mysql` con `cp -r`",
      "Montare NFS e copiare i file raw del database",
      "Usare `mysqldump`, eventualmente compresso al volo",
      "Salvare solo i log in `/var/log/mysql/`"
    ],
    answer: 2,
    explanation:
      "Negli appunti è esplicitato di evitare la copia raw a motore acceso e preferire `mysqldump`."
  },
  {
    id: 22,
    topic: "MySQL",
    source: "21-MySql.md",
    prompt: "In una transazione SQL, cosa fa `ROLLBACK`?",
    options: [
      "Conferma definitivamente le modifiche",
      "Riavvia il demone `mysqld`",
      "Annulla le modifiche effettuate dal `BEGIN` precedente",
      "Trasforma una query in sola lettura"
    ],
    answer: 2,
    explanation:
      "`ROLLBACK` ripristina lo stato precedente annullando le modifiche non confermate."
  },
  {
    id: 23,
    topic: "Apache",
    source: "22-Apache.md",
    prompt: "Qual è la logica `available` vs `enabled` nella configurazione Debian di Apache?",
    options: [
      "Apache legge direttamente solo le cartelle `*-available`",
      "`*-enabled` contiene i symlink realmente caricati da Apache",
      "`*-enabled` viene usata solo per i log",
      "`*-available` contiene solo file temporanei di cache"
    ],
    answer: 1,
    explanation:
      "Nei sistemi Debian, Apache legge le directory `*-enabled`, popolate tramite symlink."
  },
  {
    id: 24,
    topic: "Apache",
    source: "22-Apache.md",
    prompt: "Quale MPM è il più sicuro quando si usa il classico `mod_php`?",
    options: [
      "event",
      "worker",
      "prefork",
      "async"
    ],
    answer: 2,
    explanation:
      "`mod_php` non è thread-safe come scenario generale, quindi viene preferito `mpm_prefork`."
  },
  {
    id: 25,
    topic: "Apache",
    source: "22-Apache.md",
    prompt: "A cosa serve `ServerTokens Prod` in `security.conf`?",
    options: [
      "A mostrare la versione completa di Apache ai client",
      "A nascondere dettagli come versione e sistema operativo negli header",
      "A forzare HTTPS su tutte le richieste",
      "A cambiare il DocumentRoot di default"
    ],
    answer: 1,
    explanation:
      "È una misura di hardening: riduce le informazioni offerte agli attaccanti."
  },
  {
    id: 26,
    topic: "Apache",
    source: "22-Apache.md",
    prompt: "Qual è la sequenza corretta dopo una modifica alla configurazione di Apache?",
    options: [
      "`apache2ctl configtest` e poi `apache2ctl graceful`",
      "`a2enmod ssl` e poi `mysqldump`",
      "`exportfs -rv` e poi `systemctl reboot`",
      "`ab -n 1000` e poi `tail -f`"
    ],
    answer: 0,
    explanation:
      "Prima si valida la sintassi, poi si ricarica senza far cadere le connessioni attive."
  },
  {
    id: 27,
    topic: "WordPress",
    source: "23-Wordpress.md",
    prompt: "Perché negli appunti viene aggiunta la riga `127.0.0.1 localhost blog.example.com` in `/etc/hosts`?",
    options: [
      "Per creare automaticamente il certificato TLS",
      "Per far risolvere localmente il nome del blog durante il setup",
      "Per attivare il modulo PHP in Apache",
      "Per spostare WordPress su NFSv4"
    ],
    answer: 1,
    explanation:
      "Se il nome scelto per il blog non viene risolto localmente, lo script di setup può fallire."
  },
  {
    id: 28,
    topic: "WordPress",
    source: "23-Wordpress.md",
    prompt: "Cosa produce lo script `setup-mysql -n wordpress blog.example.com` oltre al database?",
    options: [
      "Il file `/etc/wordpress/config-blog.example.com.php`",
      "Il file `/etc/apache2/sites-enabled/default.conf`",
      "Una chiave SSH in `/root/.ssh/id_rsa`",
      "Un record MX nel DNS pubblico"
    ],
    answer: 0,
    explanation:
      "Negli appunti viene indicata la creazione del file di configurazione specifico dell'istanza WordPress."
  },
  {
    id: 29,
    topic: "WordPress",
    source: "23-Wordpress.md",
    prompt: "Quale combinazione di azioni Apache compare nel setup di WordPress?",
    options: [
      "Abilitare `rewrite` e `vhost_alias`, disabilitare `000-default`, abilitare `wordpress`",
      "Disabilitare `rewrite`, abilitare `nmbd`, riavviare NFS",
      "Abilitare `ssl`, rimuovere MySQL e usare solo SQLite",
      "Creare un record `MX` e poi lanciare `exportfs -rv`"
    ],
    answer: 0,
    explanation:
      "Gli appunti elencano proprio quella sequenza per mettere online il virtual host WordPress."
  },
  {
    id: 30,
    topic: "HTTPS",
    source: "24-HTTPS.md",
    prompt: "Che cos'è una CSR nel workflow HTTPS?",
    options: [
      "Il file di log degli errori SSL di Apache",
      "La richiesta di firma che contiene chiave pubblica e dati del dominio",
      "Il certificato già firmato dalla CA",
      "Il database locale delle CA fidate"
    ],
    answer: 1,
    explanation:
      "La CSR è il materiale che il server invia alla CA per ottenere il certificato firmato."
  },
  {
    id: 31,
    topic: "HTTPS",
    source: "24-HTTPS.md",
    prompt: "Qual è la differenza tra challenge DNS e challenge HTTP?",
    options: [
      "La challenge DNS usa record come TXT/CNAME, quella HTTP un token pubblicato sotto `.well-known`",
      "La challenge DNS usa sempre FTP, quella HTTP sempre SSH",
      "La challenge DNS vale solo per IPv6, quella HTTP solo per IPv4",
      "La challenge HTTP crea la chiave privata, quella DNS crea la CSR"
    ],
    answer: 0,
    explanation:
      "Le due challenge verificano il controllo del dominio tramite canali diversi ma con la stessa finalità."
  },
  {
    id: 32,
    topic: "HTTPS",
    source: "24-HTTPS.md",
    prompt: "Perché un certificato self-signed genera in genere un avviso nel browser?",
    options: [
      "Perché usa sempre la porta 80 invece della 443",
      "Perché manca una CA fidata nel trust store del client",
      "Perché non contiene mai il nome del dominio",
      "Perché Apache non può caricarlo"
    ],
    answer: 1,
    explanation:
      "Con un self-signed la firma non risale a una CA già considerata affidabile dal browser."
  },
  {
    id: 33,
    topic: "HTTPS",
    source: "24-HTTPS.md",
    prompt: "Quale comando abilita il supporto SSL in Apache prima di configurare il VirtualHost sulla 443?",
    options: [
      "sudo a2enmod ssl",
      "sudo a2ensite ssl",
      "sudo bind9 enable tls",
      "sudo openssl reload apache"
    ],
    answer: 0,
    explanation:
      "Negli appunti il primo passo lato Apache è l'abilitazione del modulo SSL."
  },
  {
    id: 34,
    topic: "Rete e OpenSSH",
    source: "16-Configurazione della rete e OpenSSH.md",
    prompt: "Nel contesto VPN, cosa descrive correttamente lo split tunneling?",
    options: [
      "Tutto il traffico del client passa sempre dentro la VPN",
      "Solo il traffico destinato a risorse specifiche passa nella VPN, il resto esce localmente",
      "La VPN viene usata solo per DNS e DHCP",
      "Il traffico viene duplicato sia sulla rete locale sia sul tunnel"
    ],
    answer: 1,
    explanation:
      "Nello split tunneling solo certe destinazioni passano nel tunnel, non tutto il traffico della macchina."
  },
  {
    id: 35,
    topic: "Rete e OpenSSH",
    source: "16-Configurazione della rete e OpenSSH.md",
    prompt: "Qual è lo scopo pratico di `ssh-copy-id ubuntu@ip-vim`?",
    options: [
      "Copiare la chiave privata del server in `~/.ssh/id_rsa`",
      "Copiare la chiave pubblica del client nel file `authorized_keys` remoto",
      "Generare automaticamente una nuova coppia di chiavi sul server",
      "Sostituire il file `known_hosts` del client"
    ],
    answer: 1,
    explanation:
      "`ssh-copy-id` automatizza l'inserimento della chiave pubblica del client tra quelle autorizzate sul server."
  },
  {
    id: 36,
    topic: "Rete e OpenSSH",
    source: "16-Configurazione della rete e OpenSSH.md",
    prompt: "Con `rsync -avz user@myserver:/srv /home/ubuntu`, cosa succede perché la sorgente non termina con `/`?",
    options: [
      "Viene copiato solo il contenuto di `srv` direttamente in `/home/ubuntu`",
      "Viene copiata la directory `srv` come cartella dentro `/home/ubuntu`",
      "Il comando fallisce perché manca lo slash finale",
      "Rsync passa automaticamente in modalità mirror e cancella i file locali"
    ],
    answer: 1,
    explanation:
      "Senza slash finale, `rsync` copia la directory stessa, non solo il suo contenuto."
  },
  {
    id: 37,
    topic: "NFS",
    source: "17-NFS.md",
    prompt: "Quale demone NFS controlla il file `/etc/exports` quando un client richiede un mount?",
    options: [
      "rpc.mountd",
      "rpc.lockd",
      "rpc.statd",
      "rpc.rquotad"
    ],
    answer: 0,
    explanation:
      "`rpc.mountd` verifica identità del client e permessi di esportazione definiti in `/etc/exports`."
  },
  {
    id: 38,
    topic: "NFS",
    source: "17-NFS.md",
    prompt: "In un export NFS, cosa implica l'opzione `sync`?",
    options: [
      "Il server risponde prima di scrivere i dati su disco",
      "Il client deve usare sempre UDP",
      "Il server conferma solo dopo scrittura stabile dei dati sul disco",
      "L'export diventa automaticamente di sola lettura"
    ],
    answer: 2,
    explanation:
      "`sync` privilegia l'integrità: prima scrive, poi conferma."
  },
  {
    id: 39,
    topic: "NFS",
    source: "17-NFS.md",
    prompt: "Quale coppia di demoni è legata alla gestione dei lock nei sistemi NFS?",
    options: [
      "rpc.nfsd e rpcbind",
      "rpc.lockd e rpc.statd",
      "rpc.mountd e rpc.rquotad",
      "sshd e rpcbind"
    ],
    answer: 1,
    explanation:
      "`rpc.lockd` e `rpc.statd` collaborano per il file locking e il recupero dello stato."
  },
  {
    id: 40,
    topic: "Samba",
    source: "18-Samba.md",
    prompt: "Quale porta identifica il moderno SMB diretto, senza NetBIOS?",
    options: [
      "137/tcp",
      "138/tcp",
      "139/tcp",
      "445/tcp"
    ],
    answer: 3,
    explanation:
      "La porta 445 è quella del CIFS/SMB diretto, senza il layer NetBIOS."
  },
  {
    id: 41,
    topic: "Samba",
    source: "18-Samba.md",
    prompt: "Qual è il ruolo di `winbindd` in un host Linux integrato con un dominio Windows o AD?",
    options: [
      "Compilare i moduli del kernel per SMBv1",
      "Gestire i backup delle share Samba",
      "Rendere risolvibili utenti e gruppi di dominio nel sistema locale",
      "Sostituire il resolver DNS del sistema"
    ],
    answer: 2,
    explanation:
      "`winbindd` integra identità di dominio nel sistema Linux come utenti e gruppi locali."
  },
  {
    id: 42,
    topic: "Samba",
    source: "18-Samba.md",
    prompt: "Quando compare tipicamente il processo unificato `samba` al posto dei soli `smbd` e `nmbd`?",
    options: [
      "Quando la macchina è configurata come Active Directory Domain Controller",
      "Quando Samba viene usato solo come client SMB",
      "Quando si monta una share NFS nella stessa VM",
      "Quando la porta 445 è chiusa da firewall"
    ],
    answer: 0,
    explanation:
      "Negli appunti il processo `samba` è associato al ruolo di Domain Controller Active Directory."
  },
  {
    id: 43,
    topic: "DHCP",
    source: "19-DHCP.md",
    prompt: "Quale opzione DHCP viene citata per pubblicare automaticamente la configurazione di un proxy via WPAD?",
    options: [
      "Option 53",
      "Option 123",
      "Option 252",
      "Option 443"
    ],
    answer: 2,
    explanation:
      "Negli appunti il proxy via WPAD è legato esplicitamente alla Option 252."
  },
  {
    id: 44,
    topic: "DHCP",
    source: "19-DHCP.md",
    prompt: "Nella fase iniziale di negoziazione, DHCP fa uso soprattutto di:",
    options: [
      "Datagrammi broadcast",
      "Connessioni TCP persistenti",
      "Tunnel TLS end-to-end",
      "Trasferimenti unicast verso il root DNS"
    ],
    answer: 0,
    explanation:
      "Il protocollo parte in broadcast perché il client inizialmente non ha ancora una configurazione completa."
  },
  {
    id: 45,
    topic: "DHCP",
    source: "19-DHCP.md",
    prompt: "Quale affermazione distingue correttamente `isc-dhcp-server` e `dnsmasq`?",
    options: [
      "`isc-dhcp-server` è il server DHCP classico; `dnsmasq` è una soluzione leggera con DHCP e DNS caching",
      "`isc-dhcp-server` è solo un client, `dnsmasq` è solo un relay",
      "`dnsmasq` serve solo per Samba, non per DHCP",
      "Entrambi sono strumenti pensati esclusivamente per database MySQL"
    ],
    answer: 0,
    explanation:
      "Gli appunti presentano `isc-dhcp-server` come soluzione classica e `dnsmasq` come demone leggero multifunzione."
  },
  {
    id: 46,
    topic: "DNS",
    source: "20-DNS.md",
    prompt: "Se una voce è presente in `/etc/hosts`, quale risultato prevale normalmente?",
    options: [
      "Prevale il server root DNS",
      "Prevale sempre il DNS pubblico più veloce",
      "Prevale la risoluzione locale del file `/etc/hosts`",
      "La risoluzione fallisce per conflitto"
    ],
    answer: 2,
    explanation:
      "Con `hosts: files dns`, il file locale vince sulla consultazione dei server DNS esterni."
  },
  {
    id: 47,
    topic: "DNS",
    source: "20-DNS.md",
    prompt: "Quale record di zona definisce parametri globali, timer e contatto amministrativo della zona?",
    options: [
      "SOA",
      "NS",
      "TXT",
      "CNAME"
    ],
    answer: 0,
    explanation:
      "`SOA` è il record iniziale della zona e ne descrive i parametri fondamentali."
  },
  {
    id: 48,
    topic: "DNS",
    source: "20-DNS.md",
    prompt: "Quando entra in gioco tipicamente la porta 53 TCP in DNS?",
    options: [
      "Per tutte le query normali lato client",
      "Per query più pesanti e trasferimenti di zona",
      "Solo per record `A` e `AAAA`",
      "Solo in presenza di `/etc/hosts`"
    ],
    answer: 1,
    explanation:
      "Negli appunti la 53 TCP è associata ai casi più pesanti e ai trasferimenti di zona tra server."
  },
  {
    id: 49,
    topic: "MySQL",
    source: "21-MySql.md",
    prompt: "Qual è la porta di ascolto predefinita di MySQL secondo gli appunti?",
    options: [
      "2049 TCP",
      "3306 TCP",
      "5432 TCP",
      "8080 TCP"
    ],
    answer: 1,
    explanation:
      "La porta di default indicata per MySQL è 3306/TCP."
  },
  {
    id: 50,
    topic: "MySQL",
    source: "21-MySql.md",
    prompt: "Cosa restituisce la query `SELECT @@innodb_buffer_pool_size / 1024 / 1024;`?",
    options: [
      "Il numero di utenti MySQL attivi",
      "La dimensione del buffer pool InnoDB espressa in MB",
      "Il numero di database presenti nel server",
      "La percentuale di CPU usata dal demone `mysqld`"
    ],
    answer: 1,
    explanation:
      "La query converte la dimensione del buffer pool in megabyte."
  },
  {
    id: 51,
    topic: "MySQL",
    source: "21-MySql.md",
    prompt: "Quale particolarità ha la sintassi di `/etc/crontab` rispetto a una crontab utente?",
    options: [
      "Contiene il campo utente prima del comando",
      "Richiede sempre l'uso di `sudo` dentro il comando",
      "Non può eseguire comandi shell",
      "Supporta solo task relativi a MySQL"
    ],
    answer: 0,
    explanation:
      "Nel file di sistema `/etc/crontab` compare anche il campo dell'utente esecutore."
  },
  {
    id: 52,
    topic: "Apache",
    source: "22-Apache.md",
    prompt: "Quale comando Debian abilita un modulo Apache creando il symlink corretto?",
    options: [
      "a2ensite",
      "a2enconf",
      "a2enmod",
      "apache2ctl enable"
    ],
    answer: 2,
    explanation:
      "`a2enmod` abilita i moduli, mentre `a2ensite` e `a2enconf` riguardano altri contesti."
  },
  {
    id: 53,
    topic: "Apache",
    source: "22-Apache.md",
    prompt: "Che vantaggio ha `apache2ctl graceful` rispetto a un restart duro?",
    options: [
      "Ricarica la configurazione senza far cadere le connessioni attive",
      "Rigenera automaticamente i certificati TLS",
      "Converte tutti i virtual host in HTTPS",
      "Disabilita il modulo PHP in automatico"
    ],
    answer: 0,
    explanation:
      "`graceful` ricarica la configurazione aspettando che le connessioni in corso terminino."
  },
  {
    id: 54,
    topic: "Apache",
    source: "22-Apache.md",
    prompt: "Nel caso descritto di una VM da 4 GB con `mod_php`, a quale valore viene consigliato di abbassare `MaxRequestWorkers`?",
    options: [
      "12",
      "24",
      "64",
      "150"
    ],
    answer: 1,
    explanation:
      "Il calcolo proposto negli appunti porta a un limite prudenziale di 24 worker."
  },
  {
    id: 55,
    topic: "WordPress",
    source: "23-Wordpress.md",
    prompt: "In quale percorso Debian/Ubuntu sono forniti i template e gli helper di esempio per WordPress?",
    options: [
      "/var/www/wordpress/examples",
      "/usr/share/doc/wordpress/examples",
      "/etc/apache2/wordpress/examples",
      "/opt/wordpress/setup"
    ],
    answer: 1,
    explanation:
      "I file di esempio del pacchetto WordPress sono collocati sotto `/usr/share/doc/wordpress/examples`."
  },
  {
    id: 56,
    topic: "WordPress",
    source: "23-Wordpress.md",
    prompt: "Per provare il blog da una VM client, cosa va tipicamente inserito nel file `/etc/hosts` del client?",
    options: [
      "L'IP del server associato a `blog.example.com`",
      "L'IP del client associato a `localhost`",
      "Un record MX con il dominio del blog",
      "La password MySQL dell'utente `wordpress`"
    ],
    answer: 0,
    explanation:
      "Il client deve risolvere `blog.example.com` verso l'IP della macchina che ospita WordPress."
  },
  {
    id: 57,
    topic: "WordPress",
    source: "23-Wordpress.md",
    prompt: "Qual è il metodo SQL standard citato per impostare una nuova password di WordPress direttamente nel database?",
    options: [
      "Usare `SHA2('nuovapassword', 256)`",
      "Usare `BCRYPT('nuovapassword')`",
      "Usare `MD5('nuovapassword')`",
      "Usare `PASSWORD('nuovapassword')`"
    ],
    answer: 2,
    explanation:
      "Negli appunti viene richiamato l'uso di `MD5('nuovapassword')` come metodo standard lato SQL."
  },
  {
    id: 58,
    topic: "HTTPS",
    source: "24-HTTPS.md",
    prompt: "Su cosa si basa la validazione della trust chain di un certificato lato browser o sistema operativo?",
    options: [
      "Sulla presenza della chiave privata del server nel client",
      "Sulle chiavi pubbliche delle CA già preinstallate nel trust store locale",
      "Su un record DHCP che autorizza il certificato",
      "Su una query MySQL verso il server remoto"
    ],
    answer: 1,
    explanation:
      "Client e browser possono fidarsi del certificato perché conoscono già le chiavi pubbliche delle CA affidabili."
  },
  {
    id: 59,
    topic: "HTTPS",
    source: "24-HTTPS.md",
    prompt: "Quale comando genera un certificato self-signed valido 365 giorni a partire da CSR e chiave privata?",
    options: [
      "openssl req -x509 -days 365 -in csr.crt -key private.key -out certificate.crt",
      "openssl rsa -pubout -days 365 -key private.key -out certificate.crt",
      "openssl verify -x509 -in certificate.crt -out private.key",
      "openssl csr -sign -days 365 -in private.key -out certificate.crt"
    ],
    answer: 0,
    explanation:
      "Negli appunti il certificato autofirmato viene creato con `openssl req -x509 ...`."
  },
  {
    id: 60,
    topic: "HTTPS",
    source: "24-HTTPS.md",
    prompt: "Nel VirtualHost Apache per HTTPS, quale direttiva punta alla chiave privata del server?",
    options: [
      "SSLEngine",
      "SSLCertificateFile",
      "SSLCertificateChainFile",
      "SSLCertificateKeyFile"
    ],
    answer: 3,
    explanation:
      "`SSLCertificateKeyFile` indica il percorso della chiave privata, separata dal certificato pubblico."
  },
  {
    id: 61,
    topic: "APT",
    source: "Apt",
    prompt: "Qual è la differenza corretta tra `apt update` e `apt upgrade`?",
    options: [
      "`apt update` aggiorna l'indice dei pacchetti, `apt upgrade` installa gli aggiornamenti disponibili",
      "`apt update` aggiorna il kernel, `apt upgrade` aggiorna solo i repository",
      "Sono alias perfettamente equivalenti",
      "`apt update` rimuove i pacchetti obsoleti, `apt upgrade` pulisce la cache"
    ],
    answer: 0,
    explanation:
      "`apt update` scarica gli indici aggiornati dai repository, mentre `apt upgrade` applica gli aggiornamenti ai pacchetti installati."
  },
  {
    id: 62,
    topic: "APT",
    source: "Apt",
    prompt: "Quale comando rimuove un pacchetto e anche i suoi file di configurazione principali?",
    options: [
      "apt autoremove nomepacchetto",
      "apt clean nomepacchetto",
      "apt purge nomepacchetto",
      "apt update --delete nomepacchetto"
    ],
    answer: 2,
    explanation:
      "`apt purge` rimuove il pacchetto insieme ai file di configurazione gestiti dal packaging."
  },
  {
    id: 63,
    topic: "APT",
    source: "Apt",
    prompt: "A cosa serve tipicamente `apt autoremove`?",
    options: [
      "A reinstallare automaticamente i pacchetti rotti",
      "A rimuovere dipendenze non più necessarie",
      "A scaricare tutti i sorgenti dei repository",
      "A convertire pacchetti `.rpm` in `.deb`"
    ],
    answer: 1,
    explanation:
      "`apt autoremove` elimina pacchetti installati come dipendenze e non più richiesti."
  },
  {
    id: 64,
    topic: "APT",
    source: "Apt",
    prompt: "Quale comando è più adatto per cercare pacchetti disponibili nei repository usando una parola chiave?",
    options: [
      "apt search parola",
      "apt hold parola",
      "apt download parola",
      "apt showpkg parola | bash"
    ],
    answer: 0,
    explanation:
      "`apt search` interroga i metadati dei repository e restituisce i pacchetti corrispondenti."
  },
  {
    id: 65,
    topic: "APT",
    source: "Apt",
    prompt: "Cosa fa `apt install ./pacchetto.deb`?",
    options: [
      "Installa un pacchetto locale `.deb` risolvendo anche le dipendenze tramite APT",
      "Converte automaticamente il pacchetto in formato sorgente",
      "Pubblica il pacchetto nei repository di sistema",
      "Estrae il `.deb` in `/usr/local/src` senza installarlo"
    ],
    answer: 0,
    explanation:
      "APT può installare un file `.deb` locale e tentare di soddisfare le dipendenze dai repository configurati."
  },
  {
    id: 66,
    topic: "Bash Scripting",
    source: "Bash scripting e operatori",
    prompt: "In Bash, cosa significa normalmente un exit status pari a `0`?",
    options: [
      "Errore generico",
      "Successo del comando",
      "Comando eseguito in background",
      "Permesso negato"
    ],
    answer: 1,
    explanation:
      "In Unix e Bash, `0` indica successo; i valori non zero rappresentano condizioni di errore o stati particolari."
  },
  {
    id: 67,
    topic: "Bash Scripting",
    source: "Bash scripting e operatori",
    prompt: "Qual è il comportamento corretto di `cmd1 && cmd2`?",
    options: [
      "`cmd2` viene eseguito solo se `cmd1` termina con successo",
      "`cmd2` viene eseguito solo se `cmd1` fallisce",
      "`cmd1` e `cmd2` vengono sempre eseguiti in parallelo",
      "`cmd2` sostituisce l'exit code di `cmd1` senza essere eseguito"
    ],
    answer: 0,
    explanation:
      "L'operatore `&&` esegue il comando successivo solo in caso di successo del precedente."
  },
  {
    id: 68,
    topic: "Bash Scripting",
    source: "Bash scripting e operatori",
    prompt: "Quale costrutto reindirizza l'output standard appendendo in fondo a un file senza sovrascriverlo?",
    options: [
      "`>`",
      "`2>`",
      "`>>`",
      "`<`"
    ],
    answer: 2,
    explanation:
      "`>>` aggiunge in coda al file, mentre `>` lo tronca e riscrive da zero."
  },
  {
    id: 69,
    topic: "Bash Scripting",
    source: "Bash scripting e operatori",
    prompt: "All'interno di uno script Bash, a cosa serve `\"$@\"`?",
    options: [
      "A concatenare tutti gli argomenti in una sola stringa non separabile",
      "A espandere gli argomenti posizionali preservando i confini di ciascun argomento",
      "A mostrare il PID dello script corrente",
      "A catturare solo il primo argomento"
    ],
    answer: 1,
    explanation:
      "`\"$@\"` è la forma corretta quando vuoi iterare o rilanciare tutti gli argomenti mantenendoli distinti."
  },
  {
    id: 70,
    topic: "Bash Scripting",
    source: "Bash scripting e operatori",
    prompt: "Nel test `[ -f file ]`, cosa verifica `-f`?",
    options: [
      "Che `file` sia una directory",
      "Che `file` esista ed sia un file regolare",
      "Che `file` sia eseguibile dall'utente root",
      "Che `file` sia un link simbolico"
    ],
    answer: 1,
    explanation:
      "L'operatore `-f` verifica l'esistenza di un file regolare."
  },
  {
    id: 71,
    topic: "Process Monitoring",
    source: "Monitoraggio di processi",
    prompt: "Qual è la differenza più corretta tra `ps aux` e `top`?",
    options: [
      "`ps aux` è interattivo, `top` produce solo uno snapshot statico",
      "`ps aux` mostra uno snapshot, `top` aggiorna dinamicamente l'attività dei processi",
      "Entrambi mostrano solo processi dell'utente corrente",
      "`top` può elencare file aperti, `ps aux` no"
    ],
    answer: 1,
    explanation:
      "`ps aux` fornisce una fotografia istantanea, mentre `top` è pensato per il monitoraggio in tempo reale."
  },
  {
    id: 72,
    topic: "Process Monitoring",
    source: "Monitoraggio di processi",
    prompt: "Quale segnale viene inviato di default dal comando `kill PID`?",
    options: [
      "SIGKILL",
      "SIGSTOP",
      "SIGTERM",
      "SIGHUP"
    ],
    answer: 2,
    explanation:
      "Senza opzioni esplicite, `kill` invia `SIGTERM`, dando al processo la possibilità di terminare in modo pulito."
  },
  {
    id: 73,
    topic: "Process Monitoring",
    source: "Monitoraggio di processi",
    prompt: "Cosa implica aumentare il valore di `nice` di un processo?",
    options: [
      "Il processo riceve più CPU perché diventa più prioritario",
      "Il processo diventa meno prioritario per lo scheduler",
      "Il processo viene congelato fino a reboot",
      "Il processo passa automaticamente in tempo reale"
    ],
    answer: 1,
    explanation:
      "Un valore `nice` più alto abbassa la priorità del processo nei confronti degli altri."
  },
  {
    id: 74,
    topic: "Process Monitoring",
    source: "Monitoraggio di processi",
    prompt: "Quale comando è più adatto per trovare rapidamente i PID di processi che corrispondono a un nome?",
    options: [
      "pgrep nomeprocesso",
      "chmod nomeprocesso",
      "uptime nomeprocesso",
      "find /proc -name nomeprocesso"
    ],
    answer: 0,
    explanation:
      "`pgrep` è nato proprio per cercare processi per nome o pattern e restituirne i PID."
  },
  {
    id: 75,
    topic: "Process Monitoring",
    source: "Monitoraggio di processi",
    prompt: "Quale comando mostra in modo leggibile l'utilizzo della memoria RAM e swap a livello sistema?",
    options: [
      "free -h",
      "du -sh /proc",
      "df -h",
      "ip a"
    ],
    answer: 0,
    explanation:
      "`free -h` riassume memoria fisica e swap in formato human-readable."
  },
  {
    id: 76,
    topic: "SSH Tunnel",
    source: "Tunnel SSH",
    prompt: "Quale opzione di SSH realizza un local port forwarding?",
    options: [
      "`-L`",
      "`-R`",
      "`-D`",
      "`-J`"
    ],
    answer: 0,
    explanation:
      "`ssh -L porta_locale:host_destinazione:porta_destinazione` crea un tunnel locale."
  },
  {
    id: 77,
    topic: "SSH Tunnel",
    source: "Tunnel SSH",
    prompt: "Qual è il significato corretto di `ssh -R 8080:localhost:80 user@server`?",
    options: [
      "Espone la porta 80 locale sulla porta 8080 del server remoto",
      "Espone la porta 8080 remota sulla porta 80 locale",
      "Crea un proxy SOCKS sulla porta 8080",
      "Abilita il forwarding X11 sulla porta 80"
    ],
    answer: 0,
    explanation:
      "Con `-R`, il bind avviene sul lato remoto e inoltra verso una destinazione vista dal client SSH."
  },
  {
    id: 78,
    topic: "SSH Tunnel",
    source: "Tunnel SSH",
    prompt: "A cosa serve `ssh -D 1080 user@server`?",
    options: [
      "A creare un tunnel punto-punto layer 2",
      "A creare un proxy dinamico SOCKS locale sulla porta 1080",
      "A fare port forwarding remoto della shell",
      "A disabilitare la compressione SSH"
    ],
    answer: 1,
    explanation:
      "`-D` crea un proxy SOCKS locale, utile per instradare traffico in modo dinamico attraverso SSH."
  },
  {
    id: 79,
    topic: "SSH Tunnel",
    source: "Tunnel SSH",
    prompt: "Qual è l'utilità dell'opzione `-N` in un comando SSH usato per tunneling?",
    options: [
      "Esegue il login interattivo senza shell",
      "Dice a SSH di non eseguire comandi remoti e usare la sessione solo per il tunnel",
      "Disabilita l'autenticazione a chiave",
      "Apre una seconda connessione TCP di controllo"
    ],
    answer: 1,
    explanation:
      "`-N` è utile quando vuoi soltanto mantenere attivo un forwarding, senza lanciare una shell remota."
  },
  {
    id: 80,
    topic: "SSH Tunnel",
    source: "Tunnel SSH",
    prompt: "Quale coppia descrive correttamente `-L` e `-R`?",
    options: [
      "`-L` apre lato locale, `-R` apre lato remoto",
      "`-L` crea solo tunnel UDP, `-R` solo TCP",
      "`-L` usa SOCKS, `-R` usa HTTP",
      "`-L` vale solo con root, `-R` solo con utenti normali"
    ],
    answer: 0,
    explanation:
      "La differenza chiave è dove viene aperta la porta in ascolto: locale con `-L`, remota con `-R`."
  },
  {
    id: 81,
    topic: "Ansible",
    source: "Ansible",
    prompt: "Che cos'è l'inventory in Ansible?",
    options: [
      "Il file che contiene solo le password SSH",
      "L'elenco degli host e dei gruppi di host gestiti",
      "Il log delle esecuzioni precedenti dei playbook",
      "Il repository dei ruoli Galaxy scaricati"
    ],
    answer: 1,
    explanation:
      "L'inventory definisce i target Ansible, spesso organizzati in gruppi logici."
  },
  {
    id: 82,
    topic: "Ansible",
    source: "Ansible",
    prompt: "Cosa fa tipicamente il comando `ansible all -m ping`?",
    options: [
      "Invia ICMP ping classici a tutti gli host",
      "Verifica che gli host siano raggiungibili via SSH e possano eseguire il modulo `ping` di Ansible",
      "Riavvia tutti i target dell'inventory",
      "Controlla la latenza di rete con pacchetti UDP"
    ],
    answer: 1,
    explanation:
      "Il modulo `ping` di Ansible non usa ICMP classico: verifica la raggiungibilità logica del target via Ansible."
  },
  {
    id: 83,
    topic: "Ansible",
    source: "Ansible",
    prompt: "Cosa significa che un task o un playbook è idempotente?",
    options: [
      "Che non può essere eseguito due volte",
      "Che a parità di stato iniziale può essere rieseguito senza introdurre modifiche inutili",
      "Che gira solo su sistemi Linux e non su Unix",
      "Che richiede sempre `become: true`"
    ],
    answer: 1,
    explanation:
      "L'idempotenza è centrale in Ansible: rieseguire lo stesso playbook non deve sporcare lo stato se tutto è già conforme."
  },
  {
    id: 84,
    topic: "Ansible",
    source: "Ansible",
    prompt: "A cosa serve `become: true` in un task Ansible?",
    options: [
      "A trasformare il task in un handler",
      "A forzare il task a essere eseguito in parallelo su tutti gli host",
      "A usare privilege escalation, tipicamente verso root",
      "A esportare variabili d'ambiente sul controller"
    ],
    answer: 2,
    explanation:
      "`become: true` abilita l'elevazione dei privilegi sul nodo remoto, spesso tramite sudo."
  },
  {
    id: 85,
    topic: "Ansible",
    source: "Ansible",
    prompt: "Quando viene eseguito normalmente un handler in Ansible?",
    options: [
      "Sempre all'inizio del play",
      "Solo se viene notificato da un task che ha prodotto un cambiamento",
      "Una volta per ogni host anche senza task precedenti",
      "Solo in modalità check"
    ],
    answer: 1,
    explanation:
      "Gli handler vengono attivati tramite `notify` e di norma partono solo se un task ha effettivamente cambiato qualcosa."
  }
];
