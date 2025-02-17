from kafka import KafkaConsumer
import json

KAFKA_BROKER = "localhost:9092"  # Update this with your Kafka broker
TOPIC_NAME = "mpesa_statements"

def create_consumer():
    return KafkaConsumer(
        TOPIC_NAME,
        bootstrap_servers=KAFKA_BROKER,
        value_deserializer=lambda v: json.loads(v.decode("utf-8")),
        auto_offset_reset="earliest",
        enable_auto_commit=True
    )

def consume_statements():
    consumer = create_consumer()
    for message in consumer:
        statement_data = message.value
        print(f"\nReceived full statement data:\n{json.dumps(statement_data, indent=2)}")

if __name__ == "__main__":
    consume_statements()
