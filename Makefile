# Define variables for OpenShift/Kubernetes commands
OC=oc
DEPLOY_DIR=k8s
SERVICES_DIR=k8s/services
ROUTES_DIR=k8s/routes
CONFIGS_DIR=k8s/configs

# ANSI color codes
RESET=\033[0m
BOLD=\033[1m
GREEN=\033[32m
YELLOW=\033[33m
RED=\033[31m
CYAN=\033[36m

# Targets
.PHONY: deploy delete build status

# Deploy all resources
deploy: deploy-deployments deploy-services deploy-routes deploy-configs
	@echo -e "$(GREEN)Deployment completed successfully!$(RESET)"

# Apply all deployments
deploy-deployments:
	@echo -e "$(CYAN)Applying deployments...$(RESET)"
	$(OC) apply -f $(DEPLOY_DIR)/frontend-deployment.yaml
	$(OC) apply -f $(DEPLOY_DIR)/backend-deployment.yaml
	$(OC) apply -f $(DEPLOY_DIR)/kafka-deployment.yaml
	$(OC) apply -f $(DEPLOY_DIR)/nginx-deployment.yaml
	$(OC) apply -f $(DEPLOY_DIR)/zookeeper-deployment.yaml
	@echo -e "$(GREEN)Deployments applied successfully!$(RESET)"

# Apply all services
deploy-services:
	@echo -e "$(CYAN)Applying services...$(RESET)"
	$(OC) apply -f $(SERVICES_DIR)/frontend-service.yaml
	$(OC) apply -f $(SERVICES_DIR)/backend-service.yaml
	$(OC) apply -f $(SERVICES_DIR)/kafka-service.yaml
	$(OC) apply -f $(SERVICES_DIR)/nginx-service.yaml
	$(OC) apply -f $(SERVICES_DIR)/zookeeper-service.yaml
	@echo -e "$(GREEN)Services applied successfully!$(RESET)"

# Apply all routes (if applicable)
deploy-routes:
	@echo -e "$(CYAN)Applying routes...$(RESET)"
	$(OC) apply -f $(ROUTES_DIR)/frontend-route.yaml
	$(OC) apply -f $(ROUTES_DIR)/backend-route.yaml
	$(OC) apply -f $(ROUTES_DIR)/nginx-route.yaml
	@echo -e "$(GREEN)Routes applied successfully!$(RESET)"

# Apply all configuration files (log4j, zoo.cfg)
deploy-configs:
	@echo -e "$(CYAN)Applying configuration files...$(RESET)"
	$(OC) apply -f $(CONFIGS_DIR)/log4j-configmap.yaml
	$(OC) apply -f $(CONFIGS_DIR)/zoo-configmap.yaml --save-config
	@echo -e "$(GREEN)Configuration files applied successfully!$(RESET)"

# Delete all resources
delete:
	@echo -e "$(YELLOW)Deleting resources...$(RESET)"
	$(OC) delete -f $(DEPLOY_DIR)/frontend-deployment.yaml
	$(OC) delete -f $(DEPLOY_DIR)/backend-deployment.yaml
	$(OC) delete -f $(DEPLOY_DIR)/kafka-deployment.yaml
	$(OC) delete -f $(DEPLOY_DIR)/nginx-deployment.yaml
	$(OC) delete -f $(DEPLOY_DIR)/zookeeper-deployment.yaml
	$(OC) delete -f $(SERVICES_DIR)/frontend-service.yaml
	$(OC) delete -f $(SERVICES_DIR)/backend-service.yaml
	$(OC) delete -f $(SERVICES_DIR)/kafka-service.yaml
	$(OC) delete -f $(SERVICES_DIR)/nginx-service.yaml
	$(OC) delete -f $(SERVICES_DIR)/zookeeper-service.yaml
	$(OC) delete -f $(ROUTES_DIR)/frontend-route.yaml
	$(OC) delete -f $(ROUTES_DIR)/backend-route.yaml
	$(OC) delete -f $(ROUTES_DIR)/nginx-route.yaml
	$(OC) delete -f $(CONFIGS_DIR)/log4j-configmap.yaml
	$(OC) delete -f $(CONFIGS_DIR)/zoo-configmap.yaml
	@echo -e "$(RED)Resources deleted successfully!$(RESET)"

# Build project (if needed)
build:
	# Insert your build steps here (e.g., docker build)
	@echo -e "$(BOLD)Building project...$(RESET)"
	echo "Build steps go here"
	@echo -e "$(GREEN)Build completed!$(RESET)"

# View status of the resources
status:
	@echo -e "$(CYAN)Viewing status of resources...$(RESET)"
	$(OC) get all
	@echo -e "$(GREEN)Status displayed successfully!$(RESET)"
