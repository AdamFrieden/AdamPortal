# Auto scaling

> Auto scaling dynamically adjusts the number of compute resources in a system based on current demand, optimizing performance and cost.

## Core idea
- **Dynamic Resource Management**: Automatically increases or decreases the number of active servers or instances based on real-time demand.
- **Cost Efficiency**: Reduces costs by scaling down resources during low demand periods and scaling up during peak times.
- **Performance Optimization**: Ensures applications maintain performance and availability by adjusting resources to meet demand.
- **Elasticity**: Provides the ability to handle unexpected traffic spikes without manual intervention.

## Key features
- **Threshold-based Scaling**: Triggers scaling actions based on predefined metrics such as CPU utilization or request count.
- **Scheduled Scaling**: Allows scaling actions to be scheduled based on predictable load changes, such as time of day or week.
- **Predictive Scaling**: Uses machine learning to anticipate future traffic and adjust resources proactively.
- **Integration with Monitoring Tools**: Works seamlessly with monitoring solutions to provide insights and trigger scaling actions.

## Why / When / How
- **Why Use Auto Scaling**: To ensure applications remain responsive under varying loads while optimizing resource usage and costs.
- **When to Use**: Ideal for applications with variable or unpredictable traffic patterns, such as e-commerce sites or SaaS applications.
- **How to Implement**: Define scaling policies based on metrics, set up alarms for threshold breaches, and integrate with cloud provider services like AWS Auto Scaling or Azure Scale Sets.
- **Common Pitfalls**: Over-reliance on auto scaling can lead to inefficiencies if not properly configured. Avoid using it for applications with stable, predictable loads where static provisioning is more cost-effective.

## Example / Walk-through
```pseudo
# Example of setting up auto scaling in AWS
# Define a launch configuration
launch_configuration = create_launch_configuration(
    image_id="ami-123456",
    instance_type="t2.micro"
)

# Create an auto scaling group
auto_scaling_group = create_auto_scaling_group(
    launch_configuration=launch_configuration,
    min_size=1,
    max_size=10,
    desired_capacity=2,
    availability_zones=["us-west-2a", "us-west-2b"]
)

# Set up scaling policies
scale_up_policy = create_scaling_policy(
    auto_scaling_group=auto_scaling_group,
    adjustment_type="ChangeInCapacity",
    scaling_adjustment=1,
    cooldown=300
)

scale_down_policy = create_scaling_policy(
    auto_scaling_group=auto_scaling_group,
    adjustment_type="ChangeInCapacity",
    scaling_adjustment=-1,
    cooldown=300
)

# Attach CloudWatch alarms to trigger policies
attach_alarm_to_policy(
    alarm_name="HighCPUAlarm",
    metric="CPUUtilization",
    threshold=70,
    comparison_operator="GreaterThanThreshold",
    evaluation_periods=2,
    policy=scale_up_policy
)

attach_alarm_to_policy(
    alarm_name="LowCPUAlarm",
    metric="CPUUtilization",
    threshold=30,
    comparison_operator="LessThanThreshold",
    evaluation_periods=2,
    policy=scale_down_policy
)
```

## Real-world applications
- **E-commerce Platforms**: Automatically scale resources during sales events or holiday seasons.
- **Streaming Services**: Adjust resources based on viewer demand during peak hours.
- **SaaS Applications**: Scale infrastructure to accommodate varying user loads throughout the day.

## References
- [AWS Auto Scaling Documentation](https://docs.aws.amazon.com/autoscaling/index.html)
- [Azure Virtual Machine Scale Sets](https://learn.microsoft.com/en-us/azure/virtual-machine-scale-sets/overview)