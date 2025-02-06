# Cloud Infrastructure & Deployment (Azure)

## Architecture Diagram


## Steps to Deploy the Application

1. **Create a Work Group**
   - Set up a new workgroup in the Azure web portal.

2. **Deploy a Web Server**
   - Create a web server application within the newly created workgroup.

3. **Set Up a GitHub Actions Workflow**
   - Create a new `.yml` file for the deployment pipeline inside the `.github/workflows/` directory.
   - You can create this file either directly on GitHub or locally and push it to your repository. In my case, I created it locally first and then pushed it to GitHub.

4. **Configure Azure Authentication**
   - Download the public profile required for Azure authentication.
   - Add this public profile as a GitHub secret to enable secure authentication.

5. **Set Up Environment Variables**
   - Define the necessary environment variables in GitHub’s settings under `Secrets and variables.`

6. **Trigger Deployment**
   - Once the `.yml` file is pushed to GitHub, the deployment process is automatically triggered.
   - Within 3–4 minutes, the application is successfully deployed to the server.

7. **Application URL:**
   [Scholar Match AI](https://scholar-match-ai-g8etbdfcb5dhbjbh.canadaeast-01.azurewebsites.net/)

8. **Screenshots of a successful deployment**
   *Include screenshots here.*

---

## CI/CD Pipeline Implementation

### CI/CD Pipeline YAML (GitHub Actions)
```yaml
name: Deploy to Azure Web App
on:
  push:
    branches:
      - master

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v2
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: "18.x"
      - name: Install dependencies
        run: npm install
      - name: Deploy to Azure Web App Service
        uses: azure/webapps-deploy@v2
        with:
          app-name: "scholar-match-ai"
          publish-profile: ${{ secrets.AZURE_SERVER_HOSTED }}
          package: .
```

### Pipeline Stages
- **Deploy to Azure Web App Service**: Deploys the project to the Azure Web App specified in the `app-name` using a secure publish profile.

### Environment Variables/Secrets
- Currently, environment variables and secrets are managed manually.
- These secrets and variables are used in the workflow.
- **Use Secrets in GitHub:** Add secrets in GitHub's settings under `Secrets and variables.`

---

## Security & Compliance (ISO, GDPR, SOC 2)

### Three Security Risks

#### 1. Secrets Management
- **Risk**: Storing sensitive information (like API keys or passwords) directly in the code is a big security risk.
- **Solution**:
  - Use tools like HashiCorp Vault, AWS Secrets Manager, or Azure Key Vault to store secrets securely outside the code.
  - **ISO 27001 Compliance**: Implement a secure secrets management policy.
  - **SOC 2 Compliance**: Restrict access to secrets through secure access management.
  - **GDPR Compliance**: Encrypt and securely store personal data.

#### 2. Access Control and Permissions
- **Risk**: Excessive permissions in DevOps systems can lead to unauthorized access.
- **Solution**:
  - Use **Role-Based Access Control (RBAC)** and enforce the principle of least privilege.
  - **ISO 27001 Compliance**: Restrict access based on job responsibilities.
  - **SOC 2 Compliance**: Monitor access logs for security breaches.
  - **GDPR Compliance**: Limit access to personal data.

#### 3. Security Testing and Vulnerability Scanning
- **Risk**: Speed-focused deployment can neglect security testing.
- **Solution**:
  - Integrate security tests using tools like OWASP ZAP, Snyk, or Clair.
  - Conduct **regular penetration testing**.
  - **ISO 27001 Compliance**: Conduct periodic security assessments.
  - **SOC 2 Compliance**: Implement continuous security monitoring.
  - **GDPR Compliance**: Encrypt and securely handle personal data.

### Security Best Practices for Cloud Deployments
- **Data Encryption**: Use TLS/SSL for data in transit and encrypt stored data.
- **Secure Network Setup**: Use firewalls and VPNs to restrict unauthorized access.
- **Regular Audits and Monitoring**: Use Azure Security Center for continuous monitoring.
- **Identity and Access Management (IAM)**: Enforce **Multi-Factor Authentication (MFA)** and role-based access control.

---

## Database & Storage Optimization

### PostgreSQL Performance Optimization
#### 1. Indexing
- **Before Indexing** (Slow query execution):
```sql
SELECT * FROM scholarships WHERE name = 'INSPIRE Scholarship 2025' AND description LIKE '%Government scholarship for science students pursuing bachelor degrees%';
```

- **After Indexing** (Optimized query execution):
```sql
CREATE INDEX idx_name ON scholarships(name);
CREATE INDEX idx_description ON scholarships(description);
CREATE INDEX idx_scholarshipId ON scholarships(scholarshipId);
```

#### 2. Query Optimization
- Ensure queries leverage indexing efficiently.
- Avoid `SELECT *`; fetch only necessary columns.

---

## Automation & Scripting

### Log Analyzer Script
**Script File**: [Pastebin Link](https://pastebin.com/ttKqAep)

**What the Script Does:**
- Analyzes Apache-style web server logs.
- Extracts key insights such as:
  - Total requests made.
  - Top 5 most frequent IP addresses.
  - Top 5 most requested URLs.
  - Summary of 4xx and 5xx error codes.

**Example Output:**
```
Total Requests: 10000

Top 5 IP Addresses:
  192.168.1.1: 1500 requests
  10.0.0.2: 1200 requests

Top 5 Requested URLs:
  /home: 3000 requests
  /about: 1500 requests

Error Summary:
  4xx Client Errors: 45
  5xx Server Errors: 3
```

---

## Disaster Recovery (DR) & High Availability (HA) Strategy

### Disaster Recovery (DR) Strategy
- **Multi-Region Deployment**: Deploy across multiple Azure regions.
- **Data Backup & Replication**:
  - Use Azure Backup for database and VM backups.
  - Implement **Geo-Redundant Storage (GRS)**.
- **Failover Mechanisms**:
  - Enable **Auto-Failover Groups**.
  - Use **Azure Site Recovery (ASR)**.
- **Regular DR Testing**: Conduct scheduled DR drills.

### High Availability (HA) Strategy
- **Load Balancing**: Use **Azure Load Balancer**.
- **Auto-Scaling**: Enable **Azure Virtual Machine Scale Sets**.
- **Database HA**:
  - Use **Azure SQL Database Managed Instance**.
  - Enable **Always On Availability Groups**.

### Example: Automated Backups in Azure
- **Create a Recovery Services Vault**.
- **Set Up a Daily Backup Policy**.
- **Enable Backup for a VM**.

---

### 🚀 **Deployment Completed Successfully!** 🎉

