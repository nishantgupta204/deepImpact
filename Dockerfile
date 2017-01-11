FROM node:4.4.7-slim
#  bp2hookutil must exist in the devops-toolkit directory
COPY .devops-toolkit /bp2/src/.devops-toolkit
RUN apt-get update && \
    apt-get -y install python-setuptools && \
    easy_install pip && \
    pip install --find-links=/bp2/src/.devops-toolkit bp2hookutil
COPY . /bundle
RUN (cd /bundle/programs/server && npm install)

ENV PORT=80 \
    SBIS=bpocore,haproxy443 \
    NBI_scriptplan_publish=True \
    BP2HOOK_heartbeat=/bin/true \
    BP2HOOK_peer-status=/bin/true \
    BP2HOOK_peer-update=/bin/true \
    SBI_bpocore_southbound-update=update_etc_hosts_multi_provider \
    SBI_haproxy80_southbound-update=update_etc_hosts_multi_provider \
    SBI_haproxy443_southbound-update=update_etc_hosts_multi_provider 
EXPOSE 80
CMD node /bundle/main.js