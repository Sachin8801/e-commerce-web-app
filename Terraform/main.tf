module "vpc" {
  source = "./modules/vpc"

  name = "eks-vpc"
  cidr = var.vpc_cidr

  azs = ["ap-south-1a", "ap-south-1b"]

  public_subnets  = var.public_subnets
  private_subnets = var.private_subnets
}

module "eks" {
  source = "./modules/eks"

  cluster_name    = var.cluster_name
  vpc_id          = module.vpc.vpc_id
  private_subnets = module.vpc.private_subnets
}

module "argocd" {
  source = "./modules/argoCD"
  
  depends_on = [
  module.eks,
  module.eks.node_groups
  ]
}